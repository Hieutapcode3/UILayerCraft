const test = require("node:test");
const assert = require("node:assert/strict");

const {
  I18N_STORAGE_KEY,
  DEFAULT_LANGUAGE,
  I18N_TRANSLATIONS,
  getI18nLanguage,
  setI18nLanguage,
  t
} = require("../src/ui/services/i18n.js");

test("i18n defaults to English and supports English and Vietnamese only", () => {
  assert.equal(DEFAULT_LANGUAGE, "en-US");
  assert.ok(I18N_TRANSLATIONS["en-US"]);
  assert.ok(I18N_TRANSLATIONS["vi-VN"]);
  assert.equal(I18N_TRANSLATIONS["zh-CN"], undefined);

  const keyChecks = [
    "ai_slice",
    "slice_import",
    "ai_layer_import",
    "export_figma_frame_html",
    "btn_ai_generate",
    "btn_local_image",
    "settings_title",
    "language"
  ];

  for (const key of keyChecks) {
    assert.ok(I18N_TRANSLATIONS["en-US"][key], `en-US missing ${key}`);
    assert.ok(I18N_TRANSLATIONS["vi-VN"][key], `vi-VN missing ${key}`);
  }
});

test("no translation value contains Chinese characters", () => {
  const cjk = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
  for (const [lang, dict] of Object.entries(I18N_TRANSLATIONS)) {
    for (const [key, value] of Object.entries(dict)) {
      assert.ok(!cjk.test(value), `${lang}.${key} contains Chinese characters`);
    }
  }
});

test("every English key also exists in Vietnamese", () => {
  const missing = Object.keys(I18N_TRANSLATIONS["en-US"]).filter((key) => I18N_TRANSLATIONS["vi-VN"][key] === undefined);
  assert.deepEqual(missing, []);
});

test("t() translates keys and handles fallback and parameter interpolation", () => {
  setI18nLanguage("en-US", { persist: false });
  assert.equal(getI18nLanguage(), "en-US");
  assert.equal(t("ai_slice"), "AI Slice");
  assert.equal(t("elapsed_time", { seconds: 12 }), "Elapsed: 12s");

  setI18nLanguage("vi-VN", { persist: false });
  assert.equal(t("ai_slice"), "AI Phân rã");
  assert.equal(t("elapsed_time", { seconds: 5 }), "Thời gian: 5 giây");

  // Unsupported languages (including the removed zh-CN) fall back to the default
  setI18nLanguage("zh-CN", { persist: false });
  assert.equal(getI18nLanguage(), "en-US");
  assert.equal(t("ai_slice"), "AI Slice");

  // Fallback check
  assert.equal(t("non_existing_key", "Default Fallback"), "Default Fallback");
  assert.equal(typeof I18N_STORAGE_KEY, "string");
});
