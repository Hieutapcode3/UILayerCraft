function translateModelSettings(key, fallback) {
  if (typeof t === "function") {
    return t(key, fallback);
  }
  return fallback;
}

function getModelConfigTestButtonState(config) {
  const results = config.testResults || {};
  const declaredResults = config.tasks.map((task) => results[task]).filter(Boolean);
  if (declaredResults.some((result) => result.status === "failed")) {
    return { text: translateModelSettings("test_failed", "Test Failed"), tone: "failure" };
  }
  if (declaredResults.length !== config.tasks.length || declaredResults.length === 0) {
    return { text: translateModelSettings("test_neutral", "Test"), tone: "neutral" };
  }
  if (!declaredResults.every((result) => result.status === "success")) {
    return { text: translateModelSettings("test_neutral", "Test"), tone: "neutral" };
  }
  const inpaint = results.inpaint;
  if (config.tasks.includes("inpaint") && inpaint?.status === "success") {
    return inpaint.nativeMaskSupported
      ? { text: translateModelSettings("mask_supported", "Mask Supported"), tone: "success" }
      : { text: translateModelSettings("mask_unsupported", "Mask Unsupported"), tone: "failure" };
  }
  return { text: translateModelSettings("test_passed", "Test Passed"), tone: "success" };
}

function renderModelConfigListView({ modelConfigs = [], taskRouting = {} }) {
  if (!modelConfigs.length) {
    return `<div class="model-config-empty">${escapeModelSettingsHtml(translateModelSettings("no_model_config", "No model configurations yet"))}</div>`;
  }
  const understandingConfigs = modelConfigs.filter((config) => (
    !config.tasks.includes("generation") && !config.tasks.includes("inpaint")
  ));
  const imageConfigs = modelConfigs.filter((config) => (
    config.tasks.includes("generation") || config.tasks.includes("inpaint")
  ));
  return [
    renderModelConfigGroup(translateModelSettings("task_vision", "Vision Model"), understandingConfigs, taskRouting),
    renderModelConfigGroup(translateModelSettings("task_image", "Image generation / inpainting"), imageConfigs, taskRouting)
  ].filter(Boolean).join("");
}

function renderTaskRoutingView(state) {
  const rows = [
    [
      "vision",
      translateModelSettings("task_vision", "Vision Model"),
      translateModelSettings("task_vision_hint", "AI slicing, AI layer import, and SVG understanding"),
      translateModelSettings("task_vision_help", "Calls POST /v1/chat/completions. The model must support image input.")
    ],
    [
      "image",
      translateModelSettings("task_image", "Image Generation / Inpaint"),
      translateModelSettings("task_image_hint", "Text-to-image, transparency, background restoration, and local inpaint"),
      translateModelSettings("task_image_help", "Image generation calls POST /v1/images/generations; Image inpainting calls POST /v1/images/edits, prioritizing standalone masks with fallback to semantic reference images.")
    ]
  ];
  return rows.map(([task, label, hint, help]) => {
    const eligibleTask = task === "image" ? "generation" : task;
    const selectedConfigId = task === "image"
      && state.taskRouting?.generation === state.taskRouting?.inpaint
      ? state.taskRouting.generation
      : state.taskRouting?.[task];
    const eligibleConfigs = (state.modelConfigs || [])
      .filter((config) => config.tasks.includes(eligibleTask));
    const selectedConfig = eligibleConfigs.find((config) => config.id === selectedConfigId);
    const selectedName = selectedConfig ? getModelConfigDisplayName(selectedConfig) : translateModelSettings("select_config", "Select configuration");
    const selectedDetail = selectedConfig?.baseUrl || translateModelSettings("not_configured", "Not configured");
    const options = eligibleConfigs.length
      ? eligibleConfigs.map((config) => renderTaskRouteOption(
        task,
        config,
        selectedConfigId === config.id
      )).join("")
      : `<div class="model-route-picker-empty">${escapeModelSettingsHtml(translateModelSettings("no_available_api", "No API available"))}</div>`;
    const menuId = `taskRoute${task[0].toUpperCase()}${task.slice(1)}Menu`;
    return `
      <div class="task-route-row">
        <span class="task-route-copy">
          <span class="task-route-title">
            <strong>${label}</strong>
            <button class="import-help" type="button" aria-label="Help for ${label}" data-import-help="${escapeModelSettingsHtml(help)}" data-import-help-placement="right">?</button>
          </span>
          <small>${hint}</small>
        </span>
        <div class="model-route-picker" data-route-picker="${task}">
          <button class="model-route-picker-trigger" type="button" data-route-picker-trigger="${task}" aria-haspopup="listbox" aria-expanded="false" aria-controls="${menuId}">
            <span>
              <strong>${escapeModelSettingsHtml(selectedName)}</strong>
              <small>${escapeModelSettingsHtml(selectedDetail)}</small>
            </span>
            <span class="model-route-picker-chevron" aria-hidden="true">⌄</span>
          </button>
          <div id="${menuId}" class="model-route-picker-menu" role="listbox" data-route-picker-menu="${task}" hidden>
            ${options}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderTaskRouteOption(task, config, selected) {
  const configId = config.id;
  const name = getModelConfigDisplayName(config);
  const detail = config.baseUrl;
  return `
    <button class="${selected ? "selected" : ""}" type="button" role="option" aria-selected="${String(selected)}" data-route-picker-option="${task}" data-config-id="${escapeModelSettingsHtml(configId)}">
      <strong>${escapeModelSettingsHtml(name)}</strong>
      <small>${escapeModelSettingsHtml(detail)}</small>
    </button>
  `;
}

function renderModelConfigGroup(title, configs, taskRouting) {
  if (!configs.length) return "";
  return `
    <section class="model-config-group">
      <div class="model-config-group-title">${escapeModelSettingsHtml(title)}</div>
      <div class="model-config-group-list">
        ${configs.map((config) => renderModelConfigCard(config, taskRouting)).join("")}
      </div>
    </section>
  `;
}

function renderModelConfigCard(config, taskRouting) {
  const detail = `${config.baseUrl} · ${config.model} · ${config.timeoutSeconds} ${translateModelSettings("seconds_unit", "s")}`;
  const testState = getModelConfigTestButtonState(config);
  const activeUsage = getModelConfigActiveUsage(config.id, taskRouting);
  return `
    <article class="model-config-card${activeUsage ? " active" : ""}" data-model-config-id="${escapeModelSettingsHtml(config.id)}">
      <div class="model-config-card-main">
        <div class="model-config-card-title">${escapeModelSettingsHtml(getModelConfigDisplayName(config))}</div>
        <div class="model-config-detail">${escapeModelSettingsHtml(detail)}</div>
        ${activeUsage ? `<div class="model-config-active-use">${translateModelSettings("active_use_prefix", "Active for ")}${escapeModelSettingsHtml(activeUsage)}</div>` : ""}
      </div>
      <div class="model-config-actions">
        <button class="model-config-test ${testState.tone}" type="button" data-model-config-test="${escapeModelSettingsHtml(config.id)}">${escapeModelSettingsHtml(testState.text)}</button>
        <button type="button" data-model-config-edit="${escapeModelSettingsHtml(config.id)}">${escapeModelSettingsHtml(translateModelSettings("btn_edit", "Edit"))}</button>
      </div>
    </article>
  `;
}

function getModelConfigDisplayName(config) {
  return String(config?.name || "").trim() || translateModelSettings("unnamed_api", "Unnamed API");
}

function getModelConfigActiveUsage(configId, taskRouting = {}) {
  const usages = [];
  if (taskRouting.vision === configId) usages.push(translateModelSettings("task_vision", "Vision Model"));
  if (taskRouting.generation === configId && taskRouting.inpaint === configId) {
    usages.push(translateModelSettings("task_image", "Image Generation / Inpaint"));
  } else {
    if (taskRouting.generation === configId) usages.push(translateModelSettings("mode_text_to_image", "Image generation"));
    if (taskRouting.inpaint === configId) usages.push(translateModelSettings("btn_ai_complete", "Image inpainting"));
  }
  return usages.join(", ");
}

function escapeModelSettingsHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

if (typeof module !== "undefined") {
  module.exports = {
    getModelConfigTestButtonState,
    renderModelConfigListView,
    renderTaskRoutingView
  };
}
