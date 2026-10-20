function getFigExportUiMode(embedded) {
  const translate = typeof t === "function" ? t : (_, fallback) => fallback;
  if (embedded) {
    return {
      sliceLabel: translate("slice_import", "Import Slices"),
      editableLabel: translate("btn_import_figma", "Import Design to Figma"),
      editableTitle: translate("editable_title_embedded", "Capture current preview as Figma editable layers"),
      downloadsFig: false
    };
  }
  return {
    sliceLabel: translate("slice_import_fig_web", "Download Slices .fig"),
    editableLabel: translate("btn_download_fig", "Download Design .fig"),
    editableTitle: translate("slice_import_fig_web_help", "Capture the current preview and download a .fig file that can be imported into Figma"),
    downloadsFig: true
  };
}

if (typeof module !== "undefined") {
  module.exports = {
    getFigExportUiMode
  };
}

