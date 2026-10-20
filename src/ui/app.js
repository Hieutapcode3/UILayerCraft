      const promptInput = document.getElementById("prompt");
      const charCount = document.getElementById("charCount");
      const widthInput = document.getElementById("width");
      const heightInput = document.getElementById("height");
      const customSizeDialog = document.getElementById("customSizeDialog");
      const customSizeForm = document.getElementById("customSizeForm");
      const customSizeClose = document.getElementById("customSizeClose");
      const customSizeCancel = document.getElementById("customSizeCancel");
      const recordNoteDialog = document.getElementById("recordNoteDialog");
      const recordNoteForm = document.getElementById("recordNoteForm");
      const recordNoteInput = document.getElementById("recordNoteInput");
      const recordNoteClose = document.getElementById("recordNoteClose");
      const recordNoteCancel = document.getElementById("recordNoteCancel");
      const sidebar = document.querySelector(".sidebar");
      const promptBox = document.querySelector(".prompt-box");
      const referenceSection = document.getElementById("referenceSection");
      const referenceDrop = document.getElementById("referenceDrop");
      const referenceImageInput = document.getElementById("referenceImage");
      const uploadText = document.getElementById("uploadText");
      const referenceChips = document.getElementById("referenceChips");
      const referencePopover = document.getElementById("referencePopover");
      const referencePopoverGrid = document.getElementById("referencePopoverGrid");
      const generateButton = document.getElementById("generate");
      const uploadLocalButton = document.getElementById("uploadLocal");
      const localImageInput = document.getElementById("localImage");
      const decomposeBackgroundButton = document.getElementById("decomposeBackground");
      const placeSourceButton = document.getElementById("placeSource");
      const placeAiLayersButton = document.getElementById("placeAiLayers");
      const exportFigmaFrameHtmlButton = document.getElementById("exportFigmaFrameHtml");
      const importHelpButtons = [...document.querySelectorAll("[data-import-help]")];
      const importHelpPopover = document.getElementById("importHelpPopover");
      const workspaceRestoreDialog = document.getElementById("workspaceRestoreDialog");
      const workspaceRestoreButton = document.getElementById("workspaceRestore");
      const workspaceDiscardButton = document.getElementById("workspaceDiscard");
      const workspaceRestoreRemember = document.getElementById("workspaceRestoreRemember");
      const globalLoadingDialog = document.getElementById("globalLoadingDialog");
      const globalLoadingTitle = document.getElementById("globalLoadingTitle");
      const editablePreviewLoadingDialog = document.getElementById("editablePreviewLoadingDialog");
      const editablePreviewLoadingTitle = document.getElementById("editablePreviewLoadingTitle");
      const editablePreviewLoadingDescription = document.getElementById("editablePreviewLoadingDescription");
      const editablePreviewElapsed = document.getElementById("editablePreviewElapsed");
      const editablePreviewRetry = document.getElementById("editablePreviewRetry");
      const editablePreviewCancel = document.getElementById("editablePreviewCancel");
      const backgroundDecompositionLoadingDialog = document.getElementById("backgroundDecompositionLoadingDialog");
      const backgroundDecompositionLoadingDescription = document.getElementById("backgroundDecompositionLoadingDescription");
      const backgroundDecompositionElapsed = document.getElementById("backgroundDecompositionElapsed");
      const backgroundDecompositionLoadingCancel = document.getElementById("backgroundDecompositionLoadingCancel");
      const backgroundDecompositionDialog = document.getElementById("backgroundDecompositionDialog");
      const backgroundDecompositionClose = document.getElementById("backgroundDecompositionClose");
      const backgroundDecompositionRegenerate = document.getElementById("backgroundDecompositionRegenerate");
      const backgroundDecompositionZoomControls = document.getElementById("backgroundDecompositionZoomControls");
      const backgroundDecompositionViewport = document.getElementById("backgroundDecompositionViewport");
      const backgroundDecompositionSizer = document.getElementById("backgroundDecompositionSizer");
      const backgroundDecompositionStage = document.getElementById("backgroundDecompositionStage");
      const backgroundDecompositionImage = document.getElementById("backgroundDecompositionImage");
      const backgroundDecompositionLayer = document.getElementById("backgroundDecompositionLayer");
      const backgroundDecompositionList = document.getElementById("backgroundDecompositionList");
      const backgroundDecompositionSummary = document.getElementById("backgroundDecompositionSummary");
      const backgroundDecompositionCancel = document.getElementById("backgroundDecompositionCancel");
      const backgroundDecompositionGenerate = document.getElementById("backgroundDecompositionGenerate");
      const htmlPreviewDialog = document.getElementById("htmlPreviewDialog");
      const htmlPreviewClose = document.getElementById("htmlPreviewClose");
      const htmlPreviewRegenerate = document.getElementById("htmlPreviewRegenerate");
      const htmlPreviewDownload = document.getElementById("htmlPreviewDownload");
      const htmlPreviewImport = document.getElementById("htmlPreviewImport");
      const htmlPreviewImportSettingsGroup = document.getElementById("htmlPreviewImportSettingsGroup");
      const htmlPreviewImportSettings = document.getElementById("htmlPreviewImportSettings");
      const htmlPreviewImportSettingsPopover = document.getElementById("htmlPreviewImportSettingsPopover");
      const htmlPreviewHighFidelityCapture = document.getElementById("htmlPreviewHighFidelityCapture");
      const htmlPreviewZoomControls = document.getElementById("htmlPreviewZoomControls");
      const htmlPreviewBody = document.getElementById("htmlPreviewBody");
      const htmlPreviewViewport = document.getElementById("htmlPreviewViewport");
      const htmlPreviewStage = document.getElementById("htmlPreviewStage");
      const htmlPreviewSizer = document.getElementById("htmlPreviewSizer");
      const htmlPreviewFrame = document.getElementById("htmlPreviewFrame");
      const htmlPreviewInspectorHighlight = document.getElementById("htmlPreviewInspectorHighlight");
      const htmlPreviewInspectorHighlightLabel = document.getElementById("htmlPreviewInspectorHighlightLabel");
      const htmlPreviewInspectorResize = document.getElementById("htmlPreviewInspectorResize");
      const htmlPreviewInspector = document.getElementById("htmlPreviewInspector");
      const htmlPreviewInspectorDelete = document.getElementById("htmlPreviewInspectorDelete");
      const htmlPreviewInspectorTree = document.getElementById("htmlPreviewInspectorTree");
      const htmlPreviewInspectorDetails = document.getElementById("htmlPreviewInspectorDetails");
      const resultGrid = document.getElementById("resultGrid");
      const resultCount = document.getElementById("resultCount");
      const previewZoomControls = document.getElementById("previewZoomControls");
      const cutSection = document.getElementById("cutSection");
      const cutGrid = document.getElementById("cutGrid");
      const exportSlicesButton = document.getElementById("exportSlices");
      const transparentAllButton = document.getElementById("transparentAll");
      const toggleAllSlicesButton = document.getElementById("toggleAllSlices");
      const repairPreviewButton = document.getElementById("repairPreview");
      const sliceSettingsDrawer = document.getElementById("sliceSettingsDrawer");
      const sliceSettingsClose = document.getElementById("sliceSettingsClose");
      const sliceSettingsTitle = document.getElementById("sliceSettingsTitle");
      const sliceSettingsBody = document.getElementById("sliceSettingsBody");
      const sliceImagePreview = document.getElementById("sliceImagePreview");
      const sliceImagePreviewClose = document.getElementById("sliceImagePreviewClose");
      const sliceImageEditorStage = document.getElementById("sliceImageEditorStage");
      const sliceImageEditorBase = document.getElementById("sliceImageEditorBase");
      const sliceImageEditorMask = document.getElementById("sliceImageEditorMask");
      const sliceImageEditorSize = document.getElementById("sliceImageEditorSize");
      const sliceImageEditorSizeValue = document.getElementById("sliceImageEditorSizeValue");
      const sliceImageEditorComplete = document.getElementById("sliceImageEditorComplete");
      const sliceImageEditorCancelAi = document.getElementById("sliceImageEditorCancelAi");
      const sliceImageEditorSave = document.getElementById("sliceImageEditorSave");
      const sliceImageEditorUnsaved = document.getElementById("sliceImageEditorUnsaved");
      const sliceImageEditorCancelClose = document.getElementById("sliceImageEditorCancelClose");
      const sliceImageEditorDiscard = document.getElementById("sliceImageEditorDiscard");
      const sliceImageEditorConfirmSave = document.getElementById("sliceImageEditorConfirmSave");
      const sliceImageEditorToolButtons = [...document.querySelectorAll("[data-slice-editor-tool]")];
      const sliceImageEditorBaseContext = sliceImageEditorBase.getContext("2d");
      const sliceImageEditorMaskContext = sliceImageEditorMask.getContext("2d");
      const status = document.getElementById("status");
      const statusMessage = document.getElementById("statusMessage");
      const statusClose = document.getElementById("statusClose");
      const settingsTrigger = document.getElementById("settingsTrigger");
      const settingsPanel = document.getElementById("settingsPanel");
      const settingsClose = document.getElementById("settingsClose");
      const draftsTrigger = document.getElementById("draftsTrigger");
      const draftsPanel = document.getElementById("draftsPanel");
      const draftsClose = document.getElementById("draftsClose");
      const draftsCopy = document.getElementById("draftsCopy");
      const draftsList = document.getElementById("draftsList");
      const newWorkTrigger = document.getElementById("newWorkTrigger");
      let editingWorkspaceDraftNoteId = null;
      const apiConfigStatus = document.getElementById("apiConfigStatus");
      const taskRoutingView = document.getElementById("taskRoutingView");
      const newModelConfigButton = document.getElementById("newModelConfig");
      const modelConfigDialog = document.getElementById("modelConfigDialog");
      const modelConfigDialogTitle = document.getElementById("modelConfigDialogTitle");
      const modelConfigDialogClose = document.getElementById("modelConfigDialogClose");
      const modelConfigForm = document.getElementById("modelConfigForm");
      const modelConfigIdInput = document.getElementById("modelConfigId");
      const modelConfigNameInput = document.getElementById("modelConfigName");
      const modelConfigBaseUrlInput = document.getElementById("modelConfigBaseUrl");
      const modelConfigModelInput = document.getElementById("modelConfigModel");
      const modelConfigTimeoutInput = document.getElementById("modelConfigTimeout");
      const modelConfigApiKeyInput = document.getElementById("modelConfigApiKey");
      const modelConfigRevealKeyButton = document.getElementById("modelConfigRevealKey");
      const modelConfigModelsButton = document.getElementById("modelConfigModels");
      const modelConfigModelMenu = document.getElementById("modelConfigModelMenu");
      const modelConfigDeleteButton = document.getElementById("modelConfigDelete");
      const modelConfigTestButton = document.getElementById("modelConfigTest");
      const modelConfigPurposeInputs = [...modelConfigForm.querySelectorAll('input[name="modelConfigPurpose"]')];
      const modelConfigList = document.getElementById("modelConfigList");
      const startupGate = document.getElementById("startupGate");
      const startupMessage = document.getElementById("startupMessage");
      const startupRetry = document.getElementById("startupRetry");
      const windowToggle = document.getElementById("windowToggle");
      const windowResizer = document.getElementById("windowResizer");
      let previewCanvasViewport = null;
      let htmlPreviewCanvasViewport = null;
      let htmlPreviewInspectorWidth = 360;
      let htmlPreviewInspectorScreen = null;
      let htmlPreviewInspectorSelectedElement = null;
      let htmlPreviewInspectorSelectionLocked = false;
      let htmlPreviewInspectorHoveredElement = null;
      let cleanupHtmlPreviewInspectorPicker = null;
      let htmlPreviewInspectorResizeDrag = null;
      const htmlPreviewInspectorExpandedElements = new Set();

      async function readActiveWorkspaceDraft() {
        const payload = await readWorkspaceDraftApi({ fetchWithTimeout });
        activeWorkspaceDraftId = payload.draftId;
        workspaceRestorePreference = payload.restorePreference;
        draftsTrigger.hidden = !payload.hasDraftRecords;
        return payload.draft;
      }

      async function persistActiveWorkspaceDraft(draft) {
        const payload = await writeWorkspaceDraftApi({ draft, draftId: activeWorkspaceDraftId }, { fetchBackend });
        activeWorkspaceDraftId = payload.draftId || activeWorkspaceDraftId;
        draftsTrigger.hidden = false;
      }

      async function clearActiveWorkspaceDraft() {
        await deleteWorkspaceDraftApi({ fetchBackend });
      }

      function scheduleWorkspaceDraftSave() {
        if (isRestoringWorkspaceDraft || !currentManifest) return;
        workspaceDraftDirty = true;
        workspaceDraftRevision += 1;
        clearTimeout(workspaceDraftSaveTimer);
        workspaceDraftSaveTimer = setTimeout(saveWorkspaceDraft, 350);
      }

      async function saveWorkspaceDraft() {
        if (!currentManifest) return false;
        let snapshot = null;
        try {
          snapshot = createWorkspaceDraftSnapshot();
        } catch (error) {
          console.warn("Failed to create slice record snapshot: ", error);
          return new Error(`Failed to create slice record snapshot: ${error.message || String(error)}`);
        }
        try {
          const revision = workspaceDraftRevision;
          workspaceDraftWritePromise = workspaceDraftWritePromise
            .catch(() => {})
            .then(() => persistActiveWorkspaceDraft(snapshot));
          await workspaceDraftWritePromise;
          if (revision === workspaceDraftRevision) workspaceDraftDirty = false;
          return true;
        } catch (error) {
          console.warn("Failed to write slice record: ", error);
          return new Error(`Failed to write slice record: ${error.message || String(error)}`);
        }
      }

      async function saveWorkspaceDraftAndRefreshList() {
        clearTimeout(workspaceDraftSaveTimer);
        workspaceDraftDirty = true;
        workspaceDraftRevision += 1;
        const result = await saveWorkspaceDraft();
        if (result !== true) {
          const message = result?.message || "Make sure the local service is running";
          setStatus(`Failed to save slice record: ${message}`, "error");
          return;
        }
        await renderWorkspaceDraftList().catch((error) => {
          console.warn("Failed to refresh slice records: ", error);
        });
      }

      function createWorkspaceDraftSnapshot() {
        return buildWorkspaceDraftSnapshot({
          manifest: currentManifest,
          activeResultIndex,
          activeSliceId,
          currentMode,
          currentRatio,
          currentStyle,
          width: widthInput.value,
          height: heightInput.value,
          prompt: promptInput.value,
          referenceImages,
          htmlPreview: htmlPreviewCache
        });
      }

      let modelConfigState = normalizeModelConfigPayload();
      let modelConfigApiKeyChanged = false;
      let revealedModelConfigKey = false;
      let editingModelConfigPurpose = "vision";
      let editingModelConfigWasRouted = false;
      let statusHideTimer = null;
      let busyStatusMessage = "";
      let isSettingsClosing = false;
      let revealedStoredApiKey = false;
      let apiKeyDirty = false;
      let currentManifest = null;
      let currentMode = "text-to-image";
      let currentStyle = "";
      let currentRatio = "9:16";
      const currentCount = 1;
      let activeResultIndex = 0;
      let renderedResultImageId = null;
      let referenceImages = [];
      let repairPreviewActive = false;
      let activeSliceId = null;
      const selectedSliceIds = new Set();
      let sliceSelectionAnchorId = null;
      let sliceSettingsId = null;
      let sliceSettingsPosition = null;
      let sliceSettingsDrag = null;
      let sliceDraft = null;
      let pendingExternalSliceDrag = null;
      let sliceEdit = null;
      const sliceCropVersions = new Map();
      const sliceAiControllers = new Map();
      let cutReorderDrag = null;
      let aiCompletePreview = null;
      let sliceImageEditorState = null;
      const sliceUndoStack = [];
      const sliceRedoStack = [];
      let sliceClipboard = null;
      let activeHtmlPreviewResult = null;
      let activeHtmlPreviewAssets = [];
      let htmlPreviewReadyPromise = Promise.resolve();
      let htmlPreviewLoadSequence = 0;
      let activeHtmlPreviewCalibrationCss = "";
      let activeHtmlPreviewExportGeometries = [];
      let htmlPreviewCache = createEmptyHtmlPreviewCache();
      let htmlPreviewHighFidelityCaptureEnabled = false;
      let pendingWorkspaceDraft = null;
      let activeWorkspaceDraftId = null;
      let workspaceRestorePreference = "ask";
      let workspaceDraftSaveTimer = null;
      let workspaceDraftWritePromise = Promise.resolve();
      let workspaceDraftDirty = false;
      let workspaceDraftRevision = 0;
      let isRestoringWorkspaceDraft = false;
      let editablePreviewController = null;
      let editablePreviewProgressId = "";
      let editablePreviewRequestSequence = 0;
      let activeEditablePreviewRequestId = 0;
      let editablePreviewTimer = null;
      let editablePreviewStartedAt = 0;
      let backgroundDecompositionRequest = null;
      let backgroundDecompositionReview = null;
      let backgroundDecompositionTimer = null;
      let backgroundDecompositionStartedAt = 0;
      let backgroundDecompositionDrag = null;
      let backgroundDecompositionCanvasViewport = null;
      const backgroundDecompositionUndoStack = [];
      const backgroundDecompositionRedoStack = [];
      let importActionsDisabled = true;
      let uiBusy = false;
      let figmaImportPending = false;
      let activeFigmaImportRequestId = "";
      let figmaImportRequestSequence = 0;
      let figmaFrameHtmlExportPending = false;
      let activeFigmaFrameHtmlExportRequestId = "";
      let figmaFrameHtmlExportRequestSequence = 0;
      let figmaFrameHtmlExportTimeoutId = null;
      let figmaFrameHtmlExportSelectionEligible = false;
      let figmaFrameHtmlExportSelectionReason = typeof t === "function" ? t("figma_select_full_frame", "Please select a complete frame in Figma") : "Please select a complete frame in Figma";
      const FIGMA_FRAME_HTML_EXPORT_TIMEOUT_MS = 15000;
      const FIGMA_SOURCE_IMPORT_IDLE_TIMEOUT_MS = 5000;
      const FIGMA_EDITABLE_IMPORT_IDLE_TIMEOUT_MS = 15000;
      let activeFigmaImportIdleTimeoutMs = FIGMA_EDITABLE_IMPORT_IDLE_TIMEOUT_MS;
      const figmaImportIdleWatchdog = createFigmaImportIdleWatchdog({
        timeoutMs: FIGMA_EDITABLE_IMPORT_IDLE_TIMEOUT_MS,
        onTimeout: () => {
          if (!figmaImportPending || !activeFigmaImportRequestId) return;
          const timedOutRequestId = activeFigmaImportRequestId;
          finishFigmaImportRequest(timedOutRequestId);
          setStatus(
            `Figma import returned no progress for ${Math.round(activeFigmaImportIdleTimeoutMs / 1000)} seconds, so waiting has ended. Check Figma and try again.`,
            "error"
          );
        }
      });
      let workspaceOperationRunning = false;
      const UI_WINDOW_STORAGE_KEY = "ai-ui-window-state-v2";
      const DEFAULT_UI_WINDOW = { width: 1280, height: 860 };
      const COLLAPSED_UI_WINDOW = { width: 320, height: 72 };
      let isUiCollapsed = false;
      let lastExpandedWindow = { ...DEFAULT_UI_WINDOW };
      let saveWindowStateTimer = null;
      let resizeDrag = null;
      if (typeof initI18n === "function") {
        initI18n();
      }
      const figExportUiMode = getFigExportUiMode(isEmbeddedPluginHost());

      function refreshDynamicUiLabels() {
        const mode = figExportUiMode;
        placeSourceButton.textContent = mode.sliceLabel;
        htmlPreviewImport.textContent = mode.editableLabel;
        htmlPreviewImport.title = mode.editableTitle;
        if (generateButton) {
          generateButton.textContent = uiBusy
            ? (typeof t === "function" ? t("loading_processing", "Generating...") : "Generating...")
            : (typeof t === "function" ? t("btn_ai_generate", "Generate UI") : "Generate UI");
        }
        updateModeVisibility();
        renderModelSettings();
        if (typeof renderWorkspaceDraftList === "function" && draftsPanel.classList.contains("open")) {
          renderWorkspaceDraftList();
        }
      }

      initUiWindowState();
      refreshDynamicUiLabels();
      syncCharacterCount();
      renderEmptyCutModules();
      bindHtmlPreviewInspectorControls();
      initializeLocalService();

      startupRetry.addEventListener("click", initializeLocalService);
      statusClose.addEventListener("click", () => {
        hideStatus();
      });

      promptInput.addEventListener("input", syncCharacterCount);
      promptInput.addEventListener("input", scheduleWorkspaceDraftSave);
      const saveWorkspaceBeforePageExit = () => {
        if (!workspaceDraftDirty) return;
        clearTimeout(workspaceDraftSaveTimer);
        saveWorkspaceDraft();
      };
      document.addEventListener("visibilitychange", () => {
        if (shouldFlushWorkspaceDraftOnVisibilityChange(document.visibilityState)) {
          saveWorkspaceBeforePageExit();
        }
      });
      window.addEventListener("pagehide", saveWorkspaceBeforePageExit);

      workspaceRestoreButton.addEventListener("click", async () => {
        await persistWorkspaceRestorePreference("restore").catch((error) => console.warn("Failed to save restore preference: ", error));
        if (pendingWorkspaceDraft) {
          await restoreWorkspaceDraft(pendingWorkspaceDraft);
        }
        pendingWorkspaceDraft = null;
        workspaceRestoreDialog.classList.remove("open");
      });

      workspaceDiscardButton.addEventListener("click", async () => {
        await persistWorkspaceRestorePreference("new").catch((error) => console.warn("Failed to save restore preference: ", error));
        pendingWorkspaceDraft = null;
        await startNewWorkspace();
        workspaceRestoreDialog.classList.remove("open");
      });

      newWorkTrigger.addEventListener("click", startNewWorkspace);

      draftsTrigger.addEventListener("click", async () => {
        closeModelConfigEditor();
        settingsPanel.classList.remove("open");
        draftsPanel.classList.add("open");
        await renderWorkspaceDraftList();
      });
      draftsClose.addEventListener("click", () => draftsPanel.classList.remove("open"));
      draftsCopy.addEventListener("click", duplicateActiveWorkspaceDraft);
      draftsList.addEventListener("click", handleWorkspaceDraftListClick);
      document.addEventListener("pointerdown", (event) => {
        if (!draftsPanel.classList.contains("open")) return;
        if (
          draftsPanel.contains(event.target)
          || draftsTrigger.contains(event.target)
          || recordNoteDialog.contains(event.target)
        ) return;
        draftsPanel.classList.remove("open");
      });

      settingsTrigger.addEventListener("click", () => {
        clearModelConfigStatus();
        clearTransientModelConfigTestResults();
        renderModelSettings();
        settingsPanel.classList.add("open");
      });

      settingsClose.addEventListener("click", () => {
        closeModelConfigEditor();
        settingsPanel.classList.remove("open");
      });

      document.addEventListener("click", (event) => {
        if (event.target.closest(".cut-action-menu, .cut-action-list")) {
          return;
        }
        closeCutActionMenus();
      });

      cutGrid.addEventListener("scroll", closeCutActionMenus, { passive: true });
      window.addEventListener("resize", closeCutActionMenus);

      sliceSettingsClose.addEventListener("click", () => closeSliceSettingsDrawer());
      sliceImagePreviewClose.addEventListener("click", requestCloseSliceImageEditor);
      sliceImageEditorComplete.addEventListener("click", makeSliceImageEditorAiComplete);
      sliceImageEditorCancelAi.addEventListener("click", cancelSliceImageEditorAiComplete);
      sliceImageEditorSave.addEventListener("click", async () => {
        if (await saveSliceImageEditor()) finishCloseSliceImageEditor();
      });
      sliceImageEditorCancelClose.addEventListener("click", hideSliceImageEditorUnsavedDialog);
      sliceImageEditorDiscard.addEventListener("click", finishCloseSliceImageEditor);
      sliceImageEditorConfirmSave.addEventListener("click", async () => {
        if (await saveSliceImageEditor()) finishCloseSliceImageEditor();
      });
      sliceImageEditorToolButtons.forEach((button) => {
        button.addEventListener("click", () => setSliceImageEditorTool(button.dataset.sliceEditorTool));
      });
      sliceImageEditorSize.addEventListener("input", () => {
        setSliceImageEditorBrushSize(Number(sliceImageEditorSize.value));
      });
      sliceImageEditorMask.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || !sliceImageEditorState || sliceImageEditorState.processing) return;
        event.preventDefault();
        sliceImageEditorState.drawing = true;
        sliceImageEditorState.pointerId = event.pointerId;
        sliceImageEditorState.lastPoint = null;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        drawSliceImageEditorStroke(event);
      });
      sliceImageEditorMask.addEventListener("pointermove", (event) => {
        if (!sliceImageEditorState?.drawing || sliceImageEditorState.pointerId !== event.pointerId) return;
        event.preventDefault();
        drawSliceImageEditorStroke(event);
      });
      ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
        sliceImageEditorMask.addEventListener(eventName, (event) => {
          if (!sliceImageEditorState?.drawing || (event.pointerId != null && sliceImageEditorState.pointerId !== event.pointerId)) return;
          sliceImageEditorState.drawing = false;
          sliceImageEditorState.pointerId = null;
          sliceImageEditorState.lastPoint = null;
          sliceImageEditorState.hasMask = hasSliceImageEditorMask();
          updateSliceImageEditorUi();
        });
      });
      document.addEventListener("keydown", (event) => {
        if (backgroundDecompositionDialog.classList.contains("open")) {
          handleBackgroundDecompositionKeydown(event);
          event.stopImmediatePropagation();
          return;
        }
        const modifierPressed = event.metaKey || event.ctrlKey;
        const key = event.key.toLowerCase();
        const isEditingText = Boolean(event.target.closest("input, textarea, select, [contenteditable='true']"));
        if (modifierPressed && !event.altKey && !event.shiftKey && !isEditingText && key === "a") {
          const activeImage = getActiveResultImage();
          const assets = activeImage?.sliceManifest?.assets || [];
          if (assets.length > 0) {
            event.preventDefault();
            selectAllSliceAssets();
            refreshSliceVisibility();
            renderCutModules(currentManifest);
            if (sliceSettingsDrawer.classList.contains("open")) renderSliceSettingsDrawer();
          }
          return;
        }
        if (modifierPressed && !event.altKey && !event.shiftKey && !isEditingText && key === "c") {
          const activeImage = getActiveResultImage();
          const asset = getActiveSliceAsset(activeSliceId);
          if (activeImage && asset && !asset.aiProcessing) {
            event.preventDefault();
            sliceClipboard = {
              imageId: activeImage.id,
              asset: cloneSliceAssets([asset])[0]
            };
          }
          return;
        }
        if (modifierPressed && !event.altKey && !event.shiftKey && !isEditingText && key === "v") {
          const activeImage = getActiveResultImage();
          if (activeImage && sliceClipboard?.imageId === activeImage.id) {
            event.preventDefault();
            pasteCopiedSliceAsset(activeImage);
          }
          return;
        }
        if (
          modifierPressed &&
          !event.altKey &&
          key === "z" &&
          !isEditingText
        ) {
          event.preventDefault();
          if (event.shiftKey) {
            redoSliceChange();
          } else {
            undoSliceChange();
          }
          return;
        }
        if (event.key === "Escape" && sliceImagePreview.classList.contains("open")) {
          event.preventDefault();
          if (!sliceImageEditorUnsaved.hidden) {
            hideSliceImageEditorUnsavedDialog();
          } else {
            requestCloseSliceImageEditor();
          }
        }
      });
      document.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || event.target.closest("button, input, textarea, select, details, #sliceSettingsDrawer")) {
          return;
        }
        const image = resultGrid.querySelector(".result-card.slice-mode .result-canvas img");
        if (!image) return;
        const frame = image.closest(".result-frame");
        if (!frame?.contains(event.target)) return;
        const rect = image.getBoundingClientRect();
        if (!isPointInsideRect(event.clientX, event.clientY, rect)) {
          clearSliceSelection();
          event.preventDefault();
          const edgeDistance = Math.min(
            Math.abs(event.clientX - rect.left),
            Math.abs(event.clientX - rect.right),
            Math.abs(event.clientY - rect.top),
            Math.abs(event.clientY - rect.bottom)
          );
          pendingExternalSliceDrag = {
            pointerId: event.pointerId,
            image,
            rect,
            startX: event.clientX,
            startY: event.clientY,
            startedNearEdge: edgeDistance <= 3
          };
          document.body.style.userSelect = "none";
        }
      });
      document.addEventListener("pointermove", (event) => {
        if (!pendingExternalSliceDrag || pendingExternalSliceDrag.pointerId !== event.pointerId || sliceDraft) {
          return;
        }
        const { image, rect } = pendingExternalSliceDrag;
        if (!isPointInsideRect(event.clientX, event.clientY, rect)) return;
        const card = image.closest(".result-card");
        const layer = card?.querySelector(".slice-layer");
        if (!card || !layer) return;
        const point = pointToScreenCoords(event.clientX, event.clientY, rect, currentManifest.screen);
        sliceDraft = {
          pointerId: event.pointerId,
          startX: point.x,
          startY: point.y,
          currentX: point.x,
          currentY: point.y
        };
        pendingExternalSliceDrag = null;
        layer.setPointerCapture?.(event.pointerId);
        event.preventDefault();
        renderSliceOverlay(card, layer, image);
      });
      document.addEventListener("pointerup", async (event) => {
        if (sliceEdit?.pointerId === event.pointerId) {
          const card = resultGrid.querySelector(".result-card.slice-mode");
          const layer = card?.querySelector(".slice-layer");
          const image = card?.querySelector(".result-canvas img");
          if (sliceEdit.aiCompleteSourceAssetId) {
            sliceEdit = null;
            if (card && layer && image) renderSliceOverlay(card, layer, image);
            return;
          }
          const asset = getActiveSliceAsset(sliceEdit.id);
          if (card && layer && image && asset) {
            const rect = image.getBoundingClientRect();
            const point = pointToScreenCoords(
              clampNumber(event.clientX, rect.left, rect.right, rect.right),
              clampNumber(event.clientY, rect.top, rect.bottom, rect.bottom),
              rect,
              currentManifest.screen
            );
            const nextPlacement = normalizeEditedPlacement(sliceEdit, point, currentManifest.screen);
            const changed = hasSlicePlacementChanged(sliceEdit.original, nextPlacement);
            asset.placement = nextPlacement;
            const editId = sliceEdit.id;
            sliceEdit = null;
            if (!changed) {
              renderSliceOverlay(card, layer, image);
              return;
            }
            await updateSliceAssetCrop(editId);
            refreshSliceVisibility();
            renderCutModules(currentManifest);
            renderSliceOverlay(card, layer, image);
          }
        }
        if (!sliceDraft && pendingExternalSliceDrag?.pointerId === event.pointerId) {
          const pending = pendingExternalSliceDrag;
          const moved = Math.hypot(event.clientX - pending.startX, event.clientY - pending.startY) >= 4;
          if (pending.startedNearEdge && moved && !isPointInsideRect(event.clientX, event.clientY, pending.rect)) {
            const screen = currentManifest?.screen;
            if (screen) {
              const card = pending.image.closest(".result-card");
              const layer = card?.querySelector(".slice-layer");
              sliceDraft = null;
              await addSliceAsset({ x: 0, y: 0, width: screen.width, height: screen.height });
              if (card && layer) renderSliceOverlay(card, layer, pending.image);
            }
          }
        }
        if (sliceDraft?.pointerId === event.pointerId) {
          const card = resultGrid.querySelector(".result-card.slice-mode");
          const layer = card?.querySelector(".slice-layer");
          const image = card?.querySelector(".result-canvas img");
          if (card && layer && image) {
            const rect = image.getBoundingClientRect();
            const point = pointToScreenCoords(
              clampNumber(event.clientX, rect.left, rect.right, rect.right),
              clampNumber(event.clientY, rect.top, rect.bottom, rect.bottom),
              rect,
              currentManifest.screen
            );
            sliceDraft.currentX = point.x;
            sliceDraft.currentY = point.y;
            const draft = normalizeDraftRect(sliceDraft, currentManifest.screen);
            sliceDraft = null;
            if (draft.width >= 8 && draft.height >= 8) {
              await addSliceAsset(draft);
            } else {
              renderSliceOverlay(card, layer, image);
            }
          }
        }
        pendingExternalSliceDrag = null;
        document.body.style.userSelect = "";
      });
      document.addEventListener("pointercancel", () => {
        pendingExternalSliceDrag = null;
        sliceDraft = null;
        document.body.style.userSelect = "";
        cutReorderDrag = null;
        cutGrid.querySelector(".cut-drop-indicator")?.remove();
      });
      document.addEventListener("pointermove", (event) => {
        if (!cutReorderDrag || cutReorderDrag.pointerId !== event.pointerId) return;
        const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("#cutGrid [data-slice-id]");
        if (!target) return;
        cutReorderDrag.moved = true;
        cutReorderDrag.targetId = target.dataset.sliceId;
        cutReorderDrag.before = event.clientY < target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2;
        cutGrid.querySelectorAll(".drag-over").forEach((item) => item.classList.remove("drag-over"));
        const indicator = cutGrid.querySelector(".cut-drop-indicator");
        if (indicator) {
          indicator.hidden = false;
          const top = cutReorderDrag.before ? target.offsetTop - 5 : target.offsetTop + target.offsetHeight + 5;
          indicator.style.top = `${Math.max(0, top)}px`;
        }
        event.preventDefault();
      });
      document.addEventListener("pointerup", (event) => {
        if (!cutReorderDrag || cutReorderDrag.pointerId !== event.pointerId) return;
        const drag = cutReorderDrag;
        cutReorderDrag = null;
        cutGrid.querySelector(".cut-drop-indicator")?.remove();
        if (drag.moved) reorderSliceAsset(drag.sourceId, drag.targetId, drag.before);
      });
      document.addEventListener("pointerdown", async (event) => {
        if (
          sliceDraft &&
          !event.target.closest(".result-card.slice-mode")
        ) {
          const draft = normalizeDraftRect(sliceDraft, currentManifest.screen);
          sliceDraft = null;
          if (draft.width >= 8 && draft.height >= 8) {
            await addSliceAsset(draft);
          }
          document.body.style.userSelect = "";
        }
        if (
          sliceSettingsDrawer.classList.contains("open") &&
          !event.target.closest("#sliceSettingsDrawer") &&
          !event.target.closest("#cutGrid [data-slice-id]") &&
          !event.target.closest(".slice-layer [data-slice-id]")
        ) {
          closeSliceSettingsDrawer();
        }
      });
      document.addEventListener("keydown", (event) => {
        if (
          activeSliceId &&
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key) &&
          !event.target.closest("input, textarea, select, [contenteditable='true']")
        ) {
          event.preventDefault();
          let asset = getActiveSliceAsset(activeSliceId);
          const screen = currentManifest?.screen;
          if (!asset || !screen || asset.aiProcessing) return;
          if (!event.repeat) recordSliceHistory();
          if (isLockedAiCompleteAsset(asset)) {
            asset = getOrCreateAiCompleteEditableCopy(getActiveResultImage(), asset);
            activeSliceId = asset.id;
            setStatus(typeof t === "function" ? t("status_ai_repair_kept", "AI full image kept; a pre-repair copy was created for repositioning") : "AI full image kept; a pre-repair copy was created for repositioning", "warning");
          }
          const step = event.shiftKey ? 10 : 1;
          const deltaX = event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
          const deltaY = event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
          asset.placement.x = clampNumber(asset.placement.x + deltaX, 0, screen.width - asset.placement.width, asset.placement.x);
          asset.placement.y = clampNumber(asset.placement.y + deltaY, 0, screen.height - asset.placement.height, asset.placement.y);
          const card = resultGrid.querySelector(".result-card.slice-mode");
          const layer = card?.querySelector(".slice-layer");
          const image = card?.querySelector(".result-canvas img");
          if (card && layer && image) renderSliceOverlay(card, layer, image);
          if (sliceSettingsDrawer.classList.contains("open") && sliceSettingsId === activeSliceId) {
            renderSliceSettingsDrawer();
          }
          updateSliceAssetCrop(activeSliceId)
            .then(() => renderCutModules(currentManifest))
            .catch((error) => setStatus(`Failed to update slice crop: ${error.message || String(error)}`, "error"));
          return;
        }
        if ((event.key !== "Delete" && event.key !== "Backspace") || event.target.closest("input, textarea, select, [contenteditable='true']")) {
          return;
        }
        event.preventDefault();
        if (sliceDraft || sliceEdit) {
          sliceDraft = null;
          sliceEdit = null;
          const card = resultGrid.querySelector(".result-card.slice-mode");
          const layer = card?.querySelector(".slice-layer");
          const image = card?.querySelector(".result-canvas img");
          if (card && layer && image) renderSliceOverlay(card, layer, image);
          return;
        }
        if (activeSliceId && !getActiveSliceAsset(activeSliceId)?.aiProcessing) {
          removeSelectedSliceAssets(false);
        }
      });
      sliceSettingsDrawer.querySelector(".slice-settings-head").addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || event.target.closest("button, input, select, textarea")) {
          return;
        }
        event.preventDefault();
        const rect = sliceSettingsDrawer.getBoundingClientRect();
        sliceSettingsPosition = { left: rect.left, top: rect.top };
        sliceSettingsDrag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          startLeft: rect.left,
          startTop: rect.top
        };
        sliceSettingsDrawer.classList.add("dragging");
        sliceSettingsDrawer.setPointerCapture(event.pointerId);
      });

      sliceSettingsDrawer.addEventListener("pointermove", (event) => {
        if (!sliceSettingsDrag || event.pointerId !== sliceSettingsDrag.pointerId) {
          return;
        }
        const rect = sliceSettingsDrawer.getBoundingClientRect();
        const next = clampSliceSettingsPosition(
          sliceSettingsDrag.startLeft + event.clientX - sliceSettingsDrag.startX,
          sliceSettingsDrag.startTop + event.clientY - sliceSettingsDrag.startY,
          rect.width,
          rect.height
        );
        setSliceSettingsPosition(next);
      });

      sliceSettingsDrawer.addEventListener("pointerup", (event) => {
        if (!sliceSettingsDrag || event.pointerId !== sliceSettingsDrag.pointerId) {
          return;
        }
        sliceSettingsDrawer.releasePointerCapture(event.pointerId);
        sliceSettingsDrawer.classList.remove("dragging");
        sliceSettingsDrag = null;
      });

      sliceSettingsDrawer.addEventListener("pointercancel", () => {
        sliceSettingsDrawer.classList.remove("dragging");
        sliceSettingsDrag = null;
      });

      taskRoutingView.addEventListener("click", async (event) => {
        const helpButton = event.target.closest("[data-import-help]");
        if (helpButton) {
          event.stopPropagation();
          toggleImportHelp(helpButton);
          return;
        }
        const option = event.target.closest("[data-route-picker-option]");
        if (option) {
          const task = option.dataset.routePickerOption;
          const configId = option.dataset.configId;
          closeModelRoutePickers();
          await saveTaskRouteSelection({ task, configId, restore: true });
          return;
        }
        const trigger = event.target.closest("[data-route-picker-trigger]");
        if (trigger) {
          event.stopPropagation();
          toggleModelRoutePicker(trigger.dataset.routePickerTrigger);
        }
      });
      taskRoutingView.addEventListener("keydown", handleModelRoutePickerKeydown);
      newModelConfigButton.addEventListener("click", () => openModelConfigEditor());
      modelConfigApiKeyInput.addEventListener("input", () => {
        modelConfigApiKeyChanged = true;
        revealedModelConfigKey = false;
      });
      modelConfigForm.addEventListener("submit", saveModelConfigEditor);
      modelConfigPurposeInputs.forEach((input) => {
        input.addEventListener("change", () => {
          if (!input.checked) return;
          modelConfigModelInput.value = getPurposeSwitchModelValue(
            modelConfigModelInput.value,
            editingModelConfigPurpose,
            input.value
          );
          editingModelConfigPurpose = input.value;
          updateModelConfigSubmitCopy();
        });
      });
      modelConfigDialogClose.addEventListener("click", closeModelConfigEditor);
      modelConfigDeleteButton.addEventListener("click", deleteEditedModelConfig);
      modelConfigTestButton.addEventListener("click", testEditedModelConfig);
      modelConfigRevealKeyButton.addEventListener("click", toggleEditedModelConfigKey);
      modelConfigModelsButton.addEventListener("click", downloadEditedModelConfigModels);
      modelConfigModelMenu.addEventListener("click", (event) => {
        const option = event.target.closest("[data-model-option]");
        if (!option) return;
        modelConfigModelInput.value = option.dataset.modelOption;
        closeEditedModelConfigOptions();
        modelConfigModelInput.focus();
      });
      modelConfigList.addEventListener("click", handleModelConfigListAction);

      document.addEventListener("click", (event) => {
        if (!event.target.closest("[data-route-picker]")) closeModelRoutePickers();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModelRoutePickers();
      });

      windowToggle.addEventListener("click", () => {
        setUiCollapsed(!isUiCollapsed, true);
      });

      windowResizer.addEventListener("pointerdown", (event) => {
        if (isUiCollapsed) {
          return;
        }
        event.preventDefault();
        resizeDrag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          startWidth: window.innerWidth,
          startHeight: window.innerHeight
        };
        windowResizer.setPointerCapture(event.pointerId);
      });

      windowResizer.addEventListener("pointermove", (event) => {
        if (!resizeDrag || event.pointerId !== resizeDrag.pointerId) {
          return;
        }
        const nextSize = normalizeWindowSize(
          resizeDrag.startWidth + event.clientX - resizeDrag.startX,
          resizeDrag.startHeight + event.clientY - resizeDrag.startY
        );
        lastExpandedWindow = nextSize;
        postPluginMessage({
          type: "resize-ui",
          width: nextSize.width,
          height: nextSize.height
        });
        saveWindowState({
          ...nextSize,
          collapsed: false
        });
      });

      windowResizer.addEventListener("pointerup", (event) => {
        if (!resizeDrag || event.pointerId !== resizeDrag.pointerId) {
          return;
        }
        windowResizer.releasePointerCapture(event.pointerId);
        resizeDrag = null;
      });

      windowResizer.addEventListener("pointercancel", () => {
        resizeDrag = null;
      });

      transparentAllButton.addEventListener("click", async () => {
        await makeAllSlicesTransparent();
      });

      toggleAllSlicesButton.addEventListener("click", () => {
        const activeImage = getActiveResultImage();
        const assets = activeImage?.sliceManifest?.assets || [];
        if (assets.length === 0) return;
        const shouldHide = assets.some((asset) => !asset.hidden);
        recordSliceHistory();
        assets.forEach((asset) => { asset.hidden = shouldHide; });
        scheduleWorkspaceDraftSave();
        refreshSliceVisibility();
        renderCutModules(currentManifest);
      });

      repairPreviewButton.addEventListener("click", async () => {
        const activeImage = getActiveResultImage();
        if (!activeImage) return;
        const card = resultGrid.querySelector(".result-card.slice-mode");
        const image = card?.querySelector(".result-canvas img");
        const layer = card?.querySelector(".slice-layer");
        if (!image || !layer) return;
        if (repairPreviewActive) {
          repairPreviewActive = false;
          image.src = activeImage.dataUrl;
          layer.hidden = false;
          renderSliceOverlay(card, layer, image);
          repairPreviewButton.textContent = typeof t === "function" ? t("repair_preview", "Preview Inpaint") : "Preview Inpaint";
          return;
        }
        repairPreviewButton.disabled = true;
        setStatus(typeof t === "function" ? t("status_repair_preview_generating", "Generating inpaint preview...") : "Generating inpaint preview...");
        try {
          image.src = await createRepairedPreviewImage(activeImage);
          repairPreviewActive = true;
          layer.hidden = false;
          renderSliceOverlay(card, layer, image);
          repairPreviewButton.textContent = typeof t === "function" ? t("btn_exit_preview", "Exit Inpaint Preview") : "Exit Inpaint Preview";
        } catch (error) {
          setStatus(`Failed to generate completion preview: ${error.message || String(error)}`, "error");
        } finally {
          repairPreviewButton.disabled = false;
        }
      });

      exportSlicesButton.addEventListener("click", async () => {
        await exportSlicePackage();
      });

      document.querySelectorAll(".tab").forEach((button) => {
        button.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
          currentMode = button.dataset.mode || "text-to-image";
          updateModeVisibility();
          scheduleWorkspaceDraftSave();
        });
      });

      referenceDrop.addEventListener("click", (event) => {
        if (event.target.closest("[data-remove-reference]")) {
          return;
        }
        referenceImageInput.click();
      });

      referenceImageInput.addEventListener("change", async () => {
        const files = Array.from(referenceImageInput.files || []);
        if (files.length === 0) {
          return;
        }
        await addReferenceImages(files);
        referenceImageInput.value = "";
      });

      referenceChips.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-reference]");
        if (!button) {
          return;
        }
        event.preventDefault();
        const index = Number(button.dataset.removeReference);
        removeReferenceImage(index);
      });

      referencePopoverGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-reference]");
        if (!button) {
          return;
        }
        event.preventDefault();
        const index = Number(button.dataset.removeReference);
        removeReferenceImage(index);
      });

      document.addEventListener("paste", async (event) => {
        if (currentMode !== "image-to-image") {
          return;
        }
        const files = getImagesFromClipboard(event.clipboardData);
        if (files.length === 0) {
          return;
        }
        event.preventDefault();
        await addReferenceImages(files);
      });

      promptBox.addEventListener("dragover", (event) => {
        if (currentMode !== "image-to-image") {
          return;
        }
        const hasImage = Array.from(event.dataTransfer?.items || []).some(
          (item) => item.kind === "file" && item.type.startsWith("image/")
        );
        if (!hasImage) {
          return;
        }
        event.preventDefault();
      });

      promptBox.addEventListener("drop", async (event) => {
        if (currentMode !== "image-to-image") {
          return;
        }
        const files = Array.from(event.dataTransfer?.files || []).filter(
          (file) => file && file.type && file.type.startsWith("image/")
        );
        if (files.length === 0) {
          return;
        }
        event.preventDefault();
        await addReferenceImages(files);
      });

      document.querySelectorAll("[data-ratio]").forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.ratio === "custom") {
            customSizeDialog.classList.add("open");
            requestAnimationFrame(() => widthInput.select());
            return;
          }
          document.querySelectorAll("[data-ratio]").forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
          currentRatio = button.dataset.ratio;
          applyRatio(currentRatio);
          scheduleWorkspaceDraftSave();
        });
      });

      const closeCustomSizeDialog = () => customSizeDialog.classList.remove("open");
      customSizeClose.addEventListener("click", closeCustomSizeDialog);
      customSizeCancel.addEventListener("click", closeCustomSizeDialog);
      customSizeDialog.addEventListener("click", (event) => {
        if (event.target === customSizeDialog) closeCustomSizeDialog();
      });
      customSizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const width = Math.round(clampNumber(Number(widthInput.value), 256, 4096, 750));
        const height = Math.round(clampNumber(Number(heightInput.value), 256, 4096, 1334));
        widthInput.value = width;
        heightInput.value = height;
        currentRatio = "custom";
        document.querySelectorAll("[data-ratio]").forEach((item) => item.classList.toggle("active", item.dataset.ratio === "custom"));
        const sizeLabel = document.querySelector('[data-ratio="custom"] .choice-size');
        if (sizeLabel) sizeLabel.textContent = `${width}px × ${height}px`;
        scheduleWorkspaceDraftSave();
        closeCustomSizeDialog();
      });

      const closeRecordNoteDialog = () => {
        recordNoteDialog.classList.remove("open");
        editingWorkspaceDraftNoteId = null;
      };
      recordNoteClose.addEventListener("click", closeRecordNoteDialog);
      recordNoteCancel.addEventListener("click", closeRecordNoteDialog);
      recordNoteDialog.addEventListener("click", (event) => {
        if (event.target === recordNoteDialog) closeRecordNoteDialog();
      });
      recordNoteForm.addEventListener("submit", saveWorkspaceDraftNote);

      generateButton.addEventListener("click", async () => {
        if (!promptInput.value.trim()) {
          setStatus(typeof t === "function" ? t("fill_prompt_warning", "Please enter a prompt first.") : "Please enter a prompt first.", "warning");
          promptInput.focus();
          return;
        }
        setBusy(true, typeof t === "function" ? t("status_image_generating", "Requesting image model to generate image…") : "Requesting image model to generate image…", true);
        const progressId = createAiProgressId("generate");
        let stopProgress = () => {};
        try {
          await flushWorkspaceDraftChanges();
          resetHtmlPreviewCache();
          activeSliceId = null;
          sliceEdit = null;
          renderLoadingResult(typeof t === "function" ? t("status_image_generating", "Requesting image model to generate image…") : "Requesting image model to generate image…");
          stopProgress = startAiProgressPolling(progressId, updateMainAiProgress);
          const options = {
            prompt: promptInput.value.trim(),
            mode: currentMode,
            style: currentStyle,
            count: currentCount,
            width: clampNumber(Number(widthInput.value), 256, 4096, 390),
            height: clampNumber(Number(heightInput.value), 256, 4096, 844),
            progressId
          };
          currentManifest = await createBackendManifest(options);
          clearSliceHistory();
          activeWorkspaceDraftId = null;
          renderResults(currentManifest);
          renderCutModules(currentManifest);
          setImportActionsDisabled(false);
          await saveWorkspaceDraftAndRefreshList();
          if (currentManifest.resultImages.length !== currentCount) {
            setStatus(
              `Requested ${currentCount} images; ${currentManifest.resultImages.length} returned.`,
              currentManifest.resultImages.length < currentCount ? "warning" : "info"
            );
          } else {
            const returnedSize = `${currentManifest.screen.width}×${currentManifest.screen.height}`;
            const providerNote = currentManifest.provider ? `Model: ${currentManifest.provider.model} · Requested size: ${currentManifest.provider.size} · Returned size: ${returnedSize}` : "";
            setStatus(
              currentManifest.mode === "api" ? `Image generated. ${providerNote}` : "Backend not connected or API key missing — mock resource used.",
              currentManifest.mode === "api" ? "success" : "warning"
            );
          }
        } catch (error) {
          if (error?.name === "WorkspaceDraftSaveError") {
            setStatus(`Failed to save slice record; the current workspace was kept: ${error.message || String(error)}`, "error");
            return;
          }
          currentManifest = null;
          clearSliceHistory();
          activeSliceId = null;
          sliceEdit = null;
          renderErrorResult(error.message || String(error));
          renderEmptyCutModules();
          setImportActionsDisabled(true);
          setStatus(`Generation failed: ${error.message || String(error)}`, "error");
        } finally {
          stopProgress();
          releaseBusyIfIdle();
        }
      });

      uploadLocalButton.addEventListener("click", () => {
        localImageInput.click();
      });

      localImageInput.addEventListener("change", async () => {
        const file = localImageInput.files?.[0];
        localImageInput.value = "";
        if (!file) {
          return;
        }
        try {
          validateSupportedAiImageType(file.type);
        } catch {
          setStatus(typeof t === "function" ? t("status_local_image_type", "Please select a PNG, JPG, or WebP image.") : "Please select a PNG, JPG, or WebP image.", "warning");
          return;
        }
        try {
          setBusy(true, typeof t === "function" ? t("status_local_image_reading", "Reading local image…") : "Reading local image…");
          await flushWorkspaceDraftChanges();
          resetHtmlPreviewCache();
          currentManifest = await createLocalImageManifest(file);
          clearSliceHistory();
          activeWorkspaceDraftId = null;
          activeSliceId = null;
          sliceEdit = null;
          renderResults(currentManifest);
          renderCutModules(currentManifest);
          setImportActionsDisabled(false);
          await saveWorkspaceDraftAndRefreshList();
        } catch (error) {
          if (error?.name === "WorkspaceDraftSaveError") {
            setStatus(`Failed to save slice record; the current workspace was kept: ${error.message || String(error)}`, "error");
            return;
          }
          currentManifest = null;
          clearSliceHistory();
          renderErrorResult(error.message || String(error));
          renderEmptyCutModules();
          setImportActionsDisabled(true);
          setStatus(`Failed to read local image: ${error.message || String(error)}`, "error");
        } finally {
          setBusy(false);
        }
      });

      placeSourceButton.addEventListener("click", async () => {
        if (!canStartFigmaImport()) return;
        if (figExportUiMode.downloadsFig) {
          await downloadSliceFig();
        } else {
          await placeSourceInFigma();
        }
      });

      placeAiLayersButton.addEventListener("click", async () => {
        if (!canStartFigmaImport()) return;
        if (!hasConfiguredVisionAccess()) {
          setStatus(typeof t === "function" ? t("status_no_vision_model", "Please configure a Vision model in Settings") : "Please configure a Vision model in Settings", "warning");
          return;
        }
        await previewEditableDesignHtml();
      });

      exportFigmaFrameHtmlButton.addEventListener("click", () => {
        if (!figmaFrameHtmlExportSelectionEligible) {
          if (isEmbeddedPluginHost()) {
            parent.postMessage({
              pluginMessage: createFigmaFrameHtmlExportSelectionNotice()
            }, "*");
          } else {
            setStatus(typeof t === "function" ? t("figma_select_canvas_first", "Please select a Figma canvas first") : "Please select a Figma canvas first", "warning");
          }
          return;
        }
        if (!canStartFigmaFrameHtmlExport({
          uiBusy,
          figmaImportPending,
          figmaFrameHtmlExportPending,
          selectionEligible: figmaFrameHtmlExportSelectionEligible
        })) {
          return;
        }
        if (!isEmbeddedPluginHost()) {
          setStatus(typeof t === "function" ? t("status_figma_frame_select_first", "Please select a complete frame in the Figma plugin before exporting.") : "Please select a complete frame in the Figma plugin before exporting.", "warning");
          return;
        }
        const requestId = createFigmaFrameHtmlExportRequestId(
          Date.now(),
          ++figmaFrameHtmlExportRequestSequence
        );
        figmaFrameHtmlExportPending = true;
        activeFigmaFrameHtmlExportRequestId = requestId;
        updateFigmaFrameHtmlExportButtonState();
        setBusy(true, typeof t === "function" ? t("status_figma_frame_reading", "Reading Figma frame and generating HTML…") : "Reading Figma frame and generating HTML…");
        try {
          parent.postMessage({
            pluginMessage: createFigmaFrameHtmlExportRequest(requestId)
          }, "*");
          figmaFrameHtmlExportTimeoutId = setTimeout(() => {
            if (!isActiveFigmaFrameHtmlExportRequest(requestId, {
              figmaFrameHtmlExportPending,
              activeFigmaFrameHtmlExportRequestId
            })) {
              return;
            }
            finishFigmaFrameHtmlExportRequest(requestId);
            setStatus(typeof t === "function" ? t("status_figma_frame_timeout", "Figma frame HTML export timed out. Please retry.") : "Figma frame HTML export timed out. Please retry.", "error");
          }, FIGMA_FRAME_HTML_EXPORT_TIMEOUT_MS);
        } catch (error) {
          finishFigmaFrameHtmlExportRequest(requestId);
          setStatus(`Failed to export Figma frame HTML: ${error.message || String(error)}`, "error");
        }
      });

      importHelpButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          toggleImportHelp(button);
        });
      });

      document.addEventListener("click", (event) => {
        if (importHelpPopover.hidden || importHelpPopover.contains(event.target)) return;
        closeImportHelp();
      });

      editablePreviewCancel.addEventListener("click", () => {
        if (!editablePreviewController) {
          closeEditablePreviewLoadingDialog();
          return;
        }
        editablePreviewCancel.disabled = true;
        editablePreviewCancel.textContent = typeof t === "function" ? t("status_cancelling", "Cancelling...") : "Cancelling...";
        if (editablePreviewProgressId) {
          fetchBackend(`/api/progress/${encodeURIComponent(editablePreviewProgressId)}/cancel`, { method: "POST" }).catch(() => {});
        }
        editablePreviewController?.abort();
      });
      editablePreviewRetry.addEventListener("click", () => {
        if (editablePreviewController) return;
        previewEditableDesignHtml(true);
      });
      decomposeBackgroundButton.addEventListener("click", () => {
        runBackgroundDecompositionPlanning(false);
      });
      backgroundDecompositionLoadingCancel.addEventListener("click", cancelBackgroundDecompositionPlanning);
      backgroundDecompositionClose.addEventListener("click", closeBackgroundDecompositionReview);
      backgroundDecompositionRegenerate.addEventListener("click", () => {
        closeBackgroundDecompositionReview();
        runBackgroundDecompositionPlanning(true);
      });
      backgroundDecompositionCancel.addEventListener("click", cancelBackgroundDecompositionGeneration);
      backgroundDecompositionGenerate.addEventListener("click", generateBackgroundDecompositionAssets);
      backgroundDecompositionLayer.addEventListener("pointerdown", beginBackgroundDecompositionDrag);
      backgroundDecompositionLayer.addEventListener("pointermove", moveBackgroundDecompositionDrag);
      backgroundDecompositionLayer.addEventListener("pointerup", endBackgroundDecompositionDrag);
      backgroundDecompositionLayer.addEventListener("pointercancel", endBackgroundDecompositionDrag);
      backgroundDecompositionLayer.addEventListener("lostpointercapture", endBackgroundDecompositionDrag);

      htmlPreviewClose.addEventListener("click", closeHtmlPreview);
      htmlPreviewFrame.addEventListener("load", () => {
        if (!htmlPreviewDialog.classList.contains("open")) return;
        const sequence = htmlPreviewLoadSequence;
        htmlPreviewReadyPromise = initializeLoadedHtmlPreview(sequence);
        htmlPreviewReadyPromise.catch((error) => {
          if (sequence !== htmlPreviewLoadSequence) return;
          console.error("Failed to initialize the AI layer import preview.", error);
          setStatus(error.message || String(error), "error");
        });
      });
      htmlPreviewImport.addEventListener("click", async () => {
        await importHtmlPreviewToFigma();
      });
      htmlPreviewImportSettings.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = htmlPreviewImportSettingsPopover.hidden;
        htmlPreviewImportSettingsPopover.hidden = !willOpen;
        htmlPreviewImportSettings.setAttribute(
          "aria-expanded",
          String(willOpen)
        );
      });
      htmlPreviewHighFidelityCapture.addEventListener("change", () => {
        htmlPreviewHighFidelityCaptureEnabled = htmlPreviewHighFidelityCapture.checked;
      });
      document.addEventListener("click", (event) => {
        if (
          htmlPreviewImportSettingsPopover.hidden
          || htmlPreviewImportSettingsGroup.contains(event.target)
        ) {
          return;
        }
        closeHtmlPreviewImportSettings();
      });
      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Escape"
          && !htmlPreviewImportSettingsPopover.hidden
        ) {
          closeHtmlPreviewImportSettings();
          htmlPreviewImportSettings.focus();
        }
      });
      htmlPreviewRegenerate.addEventListener("click", async () => {
        await previewEditableDesignHtml(true);
      });
      htmlPreviewDownload.addEventListener("click", async () => {
        await downloadEditableHtmlZip();
      });
      htmlPreviewDialog.addEventListener("click", (event) => {
        if (event.target === htmlPreviewDialog) {
          closeHtmlPreview();
        }
      });

      function completePendingFigmaOperation(operation) {
        const completion = completeFigmaOperation(operation, {
          figmaImportPending,
          figmaFrameHtmlExportPending
        });
        figmaImportPending = completion.figmaImportPending;
        figmaFrameHtmlExportPending = completion.figmaFrameHtmlExportPending;
        updateFigmaFrameHtmlExportButtonState();
        if (completion.shouldReleaseBusy) {
          setBusy(false);
        }
      }

      function beginFigmaImportRequest(timeoutMs = FIGMA_EDITABLE_IMPORT_IDLE_TIMEOUT_MS) {
        const requestId = createFigmaImportRequestId(
          Date.now(),
          ++figmaImportRequestSequence
        );
        activeFigmaImportRequestId = requestId;
        figmaImportPending = true;
        activeFigmaImportIdleTimeoutMs = timeoutMs;
        figmaImportIdleWatchdog.restart(timeoutMs);
        updateFigmaFrameHtmlExportButtonState();
        return requestId;
      }

      function finishFigmaImportRequest(requestId) {
        if (!isActiveFigmaImportRequest(requestId, {
          figmaImportPending,
          activeFigmaImportRequestId
        })) {
          return false;
        }
        figmaImportIdleWatchdog.stop();
        activeFigmaImportRequestId = "";
        completePendingFigmaOperation("import");
        return true;
      }

      function finishFigmaFrameHtmlExportRequest(requestId) {
        if (!isActiveFigmaFrameHtmlExportRequest(requestId, {
          figmaFrameHtmlExportPending,
          activeFigmaFrameHtmlExportRequestId
        })) {
          return false;
        }
        if (figmaFrameHtmlExportTimeoutId !== null) {
          clearTimeout(figmaFrameHtmlExportTimeoutId);
          figmaFrameHtmlExportTimeoutId = null;
        }
        activeFigmaFrameHtmlExportRequestId = "";
        completePendingFigmaOperation("figma-frame-html-export");
        return true;
      }

      window.onmessage = (event) => {
        const message = event.data?.pluginMessage;
        const activeImportMessage = readActiveFigmaImportMessage(message, {
          figmaImportPending,
          activeFigmaImportRequestId
        });
        const exportSelectionState = readFigmaFrameHtmlExportSelectionState(message);
        if (exportSelectionState) {
          figmaFrameHtmlExportSelectionEligible = exportSelectionState.eligible;
          figmaFrameHtmlExportSelectionReason = exportSelectionState.reason;
          updateFigmaFrameHtmlExportButtonState();
        }
        const pendingGenerationError = readPendingFigmaGenerationError(message, {
          figmaImportPending,
          activeFigmaImportRequestId,
          figmaFrameHtmlExportPending,
          activeFigmaFrameHtmlExportRequestId
        });
        if (pendingGenerationError) {
          if (pendingGenerationError.operation === "import") {
            finishFigmaImportRequest(pendingGenerationError.requestId);
          }
          if (pendingGenerationError.operation === "figma-frame-html-export") {
            finishFigmaFrameHtmlExportRequest(pendingGenerationError.requestId);
          }
          setStatus(pendingGenerationError.message, "error");
        }
        if (figmaFrameHtmlExportPending) {
          let payload = readFigmaFrameHtmlExportData(message, activeFigmaFrameHtmlExportRequestId);
          if (payload) {
            let exportResult = null;
            let zipBlob = null;
            try {
              exportResult = createFigmaFrameHtmlExport({
                manifest: payload.manifest,
                assets: payload.assets,
                textToBytes: textToUint8Array
              });
              zipBlob = createZipBlob(exportResult.files);
              triggerBlobDownload(zipBlob, exportResult.zipFilename);
              const warningCount = payload.warningCount + exportResult.warnings.length;
              setStatus(
                warningCount
                  ? `HTML download started; ${warningCount} properties or assets were skipped.`
                  : "HTML download started.",
                warningCount ? "warning" : "success"
              );
            } catch (error) {
              console.error("Failed to export Figma frame HTML.", error);
              setStatus(`Failed to export Figma frame HTML: ${error.message || String(error)}`, "error");
            } finally {
              payload = null;
              exportResult = null;
              zipBlob = null;
              finishFigmaFrameHtmlExportRequest(message.requestId);
            }
          }
        }
        if (
          activeImportMessage
          && activeImportMessage.type === "import-progress"
          && activeImportMessage.importType === "editable"
        ) {
          figmaImportIdleWatchdog.restart(activeFigmaImportIdleTimeoutMs);
          setBusy(
            true,
            `Importing ${activeImportMessage.processedCount} / ${activeImportMessage.totalCount} layers…`
          );
        }
        if (
          activeImportMessage
          && activeImportMessage.type === "import-success"
          && activeImportMessage.importType === "source"
        ) {
          finishFigmaImportRequest(activeImportMessage.requestId);
          setUiCollapsed(true, true);
          setStatus(typeof t === "function" ? t("status_imported_to_figma", "Source imported to Figma.") : "Source imported to Figma.", "success");
        }
        if (
          activeImportMessage
          && activeImportMessage.type === "import-success"
          && activeImportMessage.importType === "editable"
        ) {
          const skipped = Array.isArray(activeImportMessage.skipped) ? activeImportMessage.skipped : [];
          const groupWarnings = Array.isArray(activeImportMessage.groupWarnings) ? activeImportMessage.groupWarnings : [];
          finishFigmaImportRequest(activeImportMessage.requestId);
          closeHtmlPreview();
          setUiCollapsed(true, true);
          if (skipped.length || groupWarnings.length) {
            console.warn("Figma import skipped unsupported layers:", skipped);
            if (groupWarnings.length) {
              console.warn("Figma import could not restore component groups:", groupWarnings);
            }
            const warningParts = [];
            if (skipped.length) warningParts.push(`${skipped.length} unsupported layers were not imported`);
            if (groupWarnings.length) warningParts.push(`${groupWarnings.length} components were not grouped`);
            setStatus(
              `Imported ${Number(activeImportMessage.createdCount) || 0} layers, ${warningParts.join(", ")}`,
              "warning"
            );
          } else {
            setStatus("Editable design imported into Figma.", "success");
          }
        }
        if (message && message.type === "ui-window-state") {
          applyHostWindowState(message.state);
        }
      };

      if (isEmbeddedPluginHost()) {
        parent.postMessage({
          pluginMessage: { type: "request-figma-frame-export-selection-state" }
        }, "*");
      }

      window.addEventListener("resize", () => {
        handleViewportResize();
      });

      function initUiWindowState() {
        const stored = readStoredWindowState();
        if (stored) {
          lastExpandedWindow = normalizeWindowSize(stored.width, stored.height);
          setUiCollapsed(false, false);
        } else {
          saveWindowState({
            ...lastExpandedWindow,
            collapsed: false
          });
        }
      }

      function applyHostWindowState(state) {
        if (!state || typeof state !== "object") {
          return;
        }
        const collapsed = Boolean(state.collapsed);
        if (!collapsed) {
          lastExpandedWindow = normalizeWindowSize(state.width, state.height);
        }
        setUiCollapsed(collapsed, false);
      }

      function handleViewportResize() {
        if (isUiCollapsed) {
          return;
        }
        lastExpandedWindow = normalizeWindowSize(window.innerWidth, window.innerHeight);
        window.clearTimeout(saveWindowStateTimer);
        saveWindowStateTimer = window.setTimeout(() => {
          saveWindowState({
            ...lastExpandedWindow,
            collapsed: false
          });
        }, 240);
      }

      function setUiCollapsed(collapsed, notifyHost) {
        isUiCollapsed = collapsed;
        document.body.classList.toggle("collapsed", isUiCollapsed);
        windowToggle.textContent = isUiCollapsed ? "Expand" : "−";
        windowToggle.setAttribute("aria-label", isUiCollapsed ? "Expand Window" : "Collapse Window");
        windowToggle.title = isUiCollapsed ? "Expand Window" : "Collapse Window";
        const nextState = {
          ...lastExpandedWindow,
          collapsed: isUiCollapsed
        };
        saveWindowState(nextState);
        if (notifyHost) {
          postPluginMessage({
            type: "set-ui-collapsed",
            collapsed: isUiCollapsed
          });
          if (!isEmbeddedPluginHost()) {
            postPluginMessage({
              type: "resize-ui",
              width: isUiCollapsed ? COLLAPSED_UI_WINDOW.width : lastExpandedWindow.width,
              height: isUiCollapsed ? COLLAPSED_UI_WINDOW.height : lastExpandedWindow.height
            });
          }
        }
      }

      function saveWindowState(state) {
        safeStorageSet(UI_WINDOW_STORAGE_KEY, JSON.stringify(state));
        postPluginMessage({
          type: "save-ui-window-state",
          state
        });
      }

      function readStoredWindowState() {
        const raw = safeStorageGet(UI_WINDOW_STORAGE_KEY);
        if (!raw) {
          return null;
        }
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      }

      function postPluginMessage(pluginMessage) {
        if (!isEmbeddedPluginHost()) {
          return;
        }
        parent.postMessage({ pluginMessage }, "*");
      }

      async function createBackendManifest(options) {
        if (options.mode === "image-to-image") {
          return createBackendImageEditManifest(options);
        }

        const response = await fetchBackend("/api/images/generate", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            prompt: options.prompt,
            width: options.width,
            height: options.height,
            count: options.count,
            quality: "high",
            outputFormat: "png",
            background: "opaque",
            progressId: options.progressId
          })
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody.error || `API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.images) || data.images.length === 0) {
          throw new Error("API did not return images");
        }

        const resultImages = await prepareResultImages(data.images);
        const screen = createScreenFromResultImage(resultImages[0], {
          name: "ai_app_home_api",
          width: options.width,
          height: options.height
        });
        const assets = getPlannedAssets(screen).map((asset) => ({
          ...asset,
          dataUrl: createTransparentAssetPng(asset.placement.width, asset.placement.height, asset.kind)
        }));
        return {
          version: "1.0.0",
          mode: "api",
          provider: data.provider || null,
          sourcePrompt: options.prompt,
          style: options.style,
          screen,
          previewImage: {
            dataUrl: resultImages[0].dataUrl
          },
          resultImages,
          assets
        };
      }

      async function createLocalImageManifest(file) {
        const dataUrl = await fileToDataUrl(file);
        const resultImages = await prepareResultImages([{
          id: `local_${Date.now()}`,
          dataUrl,
          revisedPrompt: ""
        }]);
        const screen = createScreenFromResultImage(resultImages[0], {
          name: file.name || "local_image",
          width: 750,
          height: 1334
        });
        const assets = getPlannedAssets(screen).map((asset) => ({
          ...asset,
          dataUrl: createTransparentAssetPng(asset.placement.width, asset.placement.height, asset.kind)
        }));
        return {
          version: "1.0.0",
          mode: "local",
          provider: null,
          sourcePrompt: file.name || "Local Image",
          style: "",
          screen,
          previewImage: { dataUrl },
          resultImages,
          assets
        };
      }

      async function createBackendImageEditManifest(options) {
        if (referenceImages.length === 0) {
          throw new Error("Upload at least 1 reference image first");
        }

        const response = await fetchBackend("/api/images/edit", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            prompt: options.prompt,
            width: options.width,
            height: options.height,
            count: options.count,
            quality: "high",
            outputFormat: "png",
            background: "opaque",
            images: referenceImages,
            progressId: options.progressId
          })
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody.error || `API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.images) || data.images.length === 0) {
          throw new Error("API did not return images");
        }

        const resultImages = await prepareResultImages(data.images);
        const screen = createScreenFromResultImage(resultImages[0], {
          name: "ai_app_home_edit_api",
          width: options.width,
          height: options.height
        });
        const assets = getPlannedAssets(screen).map((asset) => ({
          ...asset,
          dataUrl: createTransparentAssetPng(asset.placement.width, asset.placement.height, asset.kind)
        }));
        return {
          version: "1.0.0",
          mode: "api",
          provider: data.provider || null,
          sourcePrompt: options.prompt,
          style: options.style,
          screen,
          previewImage: {
            dataUrl: resultImages[0].dataUrl
          },
          resultImages,
          assets
        };
      }

      function getPlannedAssets(screen) {
        return [
          {
            id: "hero_illustration",
            name: "hero_illustration",
            type: "illustration",
            kind: "illustration",
            prompt: "Hero app illustration, transparent background",
            placement: scalePlacement({ x: 196, y: 122, width: 132, height: 132 }, screen),
            transparent: true,
            selected: true
          },
          {
            id: "tab_home_icon",
            name: "tab_home_icon",
            type: "icon",
            kind: "home",
            prompt: "Minimal home icon, rounded stroke, transparent background",
            placement: scalePlacement({ x: 44, y: 790, width: 26, height: 26 }, screen),
            transparent: true,
            selected: true
          },
          {
            id: "tab_workout_icon",
            name: "tab_workout_icon",
            type: "icon",
            kind: "bolt",
            prompt: "Minimal workout lightning icon, rounded stroke, transparent background",
            placement: scalePlacement({ x: 132, y: 790, width: 26, height: 26 }, screen),
            transparent: true,
            selected: true
          },
          {
            id: "tab_profile_icon",
            name: "tab_profile_icon",
            type: "icon",
            kind: "profile",
            prompt: "Minimal user profile icon, rounded stroke, transparent background",
            placement: scalePlacement({ x: 320, y: 790, width: 26, height: 26 }, screen),
            transparent: true,
            selected: true
          }
        ];
      }

      function renderResults(manifest, {
        resultIndex = 0,
        sliceId = null
      } = {}) {
        sidebar.classList.add("has-result");
        activeResultIndex = Math.max(0, Math.min(Number(resultIndex) || 0, manifest.resultImages.length - 1));
        activeSliceId = sliceId;
        sliceEdit = null;
        repairPreviewActive = false;
        repairPreviewButton.textContent = typeof t === "function" ? t("repair_preview", "Preview Inpaint") : "Preview Inpaint";
        ensureSliceState(manifest);
        renderActiveResult(manifest);
        scheduleWorkspaceDraftSave();
      }

      function renderLoadingResult(message) {
        sidebar.classList.remove("has-result");
        previewZoomControls.hidden = true;
        resultGrid.innerHTML = `
          <div class="result-loading" role="status" aria-live="polite">
            <div class="loading-preview" aria-hidden="true"></div>
            <div class="loading-label">Generating image</div>
            <div class="loading-note">${message}</div>
          </div>
        `;
        resultCount.textContent = "Generating";
      }

      function updateMainAiProgress(progress) {
        const note = resultGrid.querySelector(".loading-note");
        const label = resultGrid.querySelector(".loading-label");
        if (!note || !label) return;
        label.textContent = progress.status === "running" ? "AI is generating the image" : progress.message;
        note.textContent = `${progress.message || "Requesting the image generation model"} · ${progress.elapsedSeconds}s`;
        note.removeAttribute("title");
      }

      function renderErrorResult(message) {
        sidebar.classList.remove("has-result");
        previewZoomControls.hidden = true;
        resultGrid.innerHTML = `
          <div class="result-error" role="alert">
            <strong>Generation did not succeed</strong>
            <span>${escapeHtml(message)}</span>
          </div>
        `;
        resultCount.textContent = "Generation failed";
      }

      function renderActiveResult(manifest) {
        previewCanvasViewport?.destroy();
        previewCanvasViewport = null;
        previewZoomControls.hidden = true;
        const scrollState = getResultFrameScrollState();
        resultGrid.innerHTML = "";
        const activeImage = manifest.resultImages[activeResultIndex] || manifest.resultImages[0];
        const imageWidth = Number(activeImage.width || manifest.screen?.width || 0);
        const imageHeight = Number(activeImage.height || manifest.screen?.height || 0);
        resultCount.textContent = imageWidth && imageHeight ? `${imageWidth}px × ${imageHeight}px` : "";
        const shouldRestoreScroll = scrollState && scrollState.resultId === activeImage.id;
        ensureImageSliceState(activeImage);
        manifest.previewImage = { dataUrl: activeImage.dataUrl };
        const card = document.createElement("div");
        card.className = "result-card slice-mode";
        card.innerHTML = `
          <div class="result-frame">
            <div class="result-sizer">
              <div class="result-canvas">
                <img src="${activeImage.dataUrl}" alt="Current generation result" />
                <div class="slice-layer" aria-label="Slice selection layer"></div>
              </div>
            </div>
          </div>
          <button class="download" type="button" aria-label="Download single">↓</button>
        `;
        card.querySelector(".download").addEventListener("click", () => {
          triggerImageDownload(activeImage.dataUrl, buildDownloadFilename(activeResultIndex));
        });
        resultGrid.appendChild(card);
        renderedResultImageId = activeImage.id;
        const frame = card.querySelector(".result-frame");
        const sizer = card.querySelector(".result-sizer");
        const canvas = card.querySelector(".result-canvas");
        const image = card.querySelector("img");
        const layer = card.querySelector(".slice-layer");
        frame.tabIndex = 0;
        bindSliceLayer(card, layer, image);
        previewCanvasViewport = createCanvasViewportController({
          viewport: frame,
          controls: previewZoomControls,
          getSourceSize: () => ({
            width: image.naturalWidth || imageWidth,
            height: image.naturalHeight || imageHeight
          }),
          fitPadding: 12,
          render: ({ contentWidth, contentHeight, left, top }) => {
            image.style.maxWidth = "none";
            image.style.maxHeight = "none";
            image.style.width = `${Math.max(1, Math.round(contentWidth))}px`;
            image.style.height = `${Math.max(1, Math.round(contentHeight))}px`;
            sizer.style.width = `${Math.max(contentWidth, frame.clientWidth)}px`;
            sizer.style.height = `${Math.max(contentHeight, frame.clientHeight)}px`;
            canvas.style.width = `${Math.max(1, contentWidth)}px`;
            canvas.style.height = `${Math.max(1, contentHeight)}px`;
            canvas.style.left = `${left}px`;
            canvas.style.top = `${top}px`;
            renderSliceOverlay(card, layer, image);
          }
        });
        const finishPreviewLoad = () => {
          previewZoomControls.hidden = false;
          previewCanvasViewport?.fit();
          if (shouldRestoreScroll) {
            restoreResultFrameScroll(frame, scrollState);
          }
        };
        if (image.complete) {
          finishPreviewLoad();
        } else {
          image.addEventListener("load", finishPreviewLoad, { once: true });
        }
      }

      function getResultFrameScrollState() {
        const frame = resultGrid.querySelector(".result-frame");
        if (!frame || !renderedResultImageId) {
          return null;
        }
        return {
          resultId: renderedResultImageId,
          left: frame.scrollLeft,
          top: frame.scrollTop
        };
      }

      function restoreResultFrameScroll(frame, scrollState) {
        if (!frame || !scrollState) {
          return;
        }
        const apply = () => {
          frame.scrollLeft = scrollState.left;
          frame.scrollTop = scrollState.top;
        };
        apply();
        requestAnimationFrame(() => {
          apply();
          requestAnimationFrame(apply);
        });
      }

      function positionCutActionMenu(menu) {
        if (!menu?.open) return;
        const trigger = menu.querySelector(".cut-action-trigger");
        const list = menu.querySelector(".cut-action-list");
        if (!trigger || !list) return;
        const triggerRect = trigger.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        const margin = 8;
        const listWidth = listRect.width || 96;
        const listHeight = listRect.height || 72;
        let left = triggerRect.right - listWidth;
        let top = triggerRect.bottom + 6;
        if (top + listHeight > window.innerHeight - margin) {
          top = triggerRect.top - listHeight - 6;
        }
        left = Math.max(margin, Math.min(left, window.innerWidth - listWidth - margin));
        top = Math.max(margin, Math.min(top, window.innerHeight - listHeight - margin));
        list.style.setProperty("--cut-action-list-left", `${Math.round(left)}px`);
        list.style.setProperty("--cut-action-list-top", `${Math.round(top)}px`);
      }

      function closeCutActionMenus() {
        cutGrid.querySelectorAll(".cut-action-menu[open]").forEach((menu) => {
          menu.open = false;
        });
        cutGrid.classList.remove("menu-open");
      }

      function formatSliceRadiiLabel(asset) {
        const radii = getSliceRadii(asset, currentManifest?.screen);
        const values = [radii.topLeft, radii.topRight, radii.bottomRight, radii.bottomLeft];
        if (values.every((value) => value === 0)) return "";
        return values.every((value) => value === values[0])
          ? ` · R${values[0]}`
          : ` · R${values.join("/")}`;
      }

      function renderCutModules(manifest, animateReorder = false) {
        if (!manifest?.resultImages?.length) {
          renderEmptyCutModules();
          return;
        }
        cutSection.classList.add("open");
        const activeImage = getActiveResultImage();
        const previousImageId = cutGrid.dataset.resultImageId;
        const scrollTop = previousImageId === activeImage.id ? cutGrid.scrollTop : 0;
        cutGrid.dataset.resultImageId = activeImage.id;
        ensureImageSliceState(activeImage);
        const assets = activeImage.sliceManifest.assets;
        exportSlicesButton.disabled = assets.length === 0;
        transparentAllButton.disabled = assets.length === 0 || assets.every((asset) => asset.transparent);
        toggleAllSlicesButton.disabled = assets.length === 0;
        repairPreviewButton.disabled = assets.length === 0;
        toggleAllSlicesButton.textContent = assets.length > 0 && assets.every((asset) => asset.hidden) ? "Show All" : "Hide All";
        if (assets.length === 0) {
          closeSliceSettingsDrawer();
          cutGrid.innerHTML = `<div class="cut-empty">No slice areas yet</div>`;
          return;
        }
        const displayAssets = [...assets].reverse();
        cutGrid.innerHTML = displayAssets.map((asset, index) => `
          <div class="cut-item${isSliceSelected(asset.id) ? " active" : ""}${asset.aiProcessing ? " ai-processing" : ""}${asset.auditFailed ? " audit-failed" : ""}" data-slice-id="${asset.id}" draggable="${asset.aiProcessing ? "false" : "true"}">
            <img class="cut-thumb" src="${asset.dataUrl}" alt="${escapeHtml(asset.name)}" data-slice-id="${asset.id}" draggable="false" style="border-radius:${getSliceRadiiCssValue(asset, currentManifest?.screen)};" />
            <div class="cut-meta">
              <span class="cut-name">${assets.length - index}. ${escapeHtml(asset.name)}</span>
              <span class="cut-size">${asset.placement.width}px × ${asset.placement.height}px${formatSliceRadiiLabel(asset)}${asset.transparent ? " · Transparent PNG" : ""}${asset.auditFailed ? " · Audit failed · needs manual adjustment" : ""}${asset.aiTransparent ? " · AI transparent" : ""}${getAiInpaintTypeLabel(asset) ? ` · ${getAiInpaintTypeLabel(asset)}` : ""}${asset.svgData ? " · SVG" : ""}${asset.aiRedrawn ? " · AI redraw" : ""}</span>
            </div>
            <details class="cut-action-menu">
              <summary class="cut-action-trigger">Transparent</summary>
              <div class="cut-action-list">
                <button class="cut-transparent${asset.transparent && !asset.aiTransparent ? " done" : ""}" type="button" data-transparent-slice="${asset.id}"${asset.aiProcessing ? " disabled" : ""}>${asset.transparent && !asset.aiTransparent ? `Made transparent ${renderRestoreIcon()}` : "Transparent"}</button>
                <button class="cut-ai-transparent${asset.aiTransparent ? " done" : ""}" type="button" data-ai-transparent-slice="${asset.id}"${asset.aiProcessing ? " disabled" : ""}>${asset.aiTransparent ? `AI made transparent ${renderRestoreIcon()}` : "AI transparent"}</button>
              </div>
            </details>
            <details class="cut-action-menu">
              <summary class="cut-action-trigger">SVG</summary>
              <div class="cut-action-list">
                <button class="cut-svg${asset.svgData && !asset.aiRedrawn ? " done" : ""}" type="button" data-svg-slice="${asset.id}"${asset.aiProcessing ? " disabled" : ""}>${asset.svgData && !asset.aiRedrawn ? `SVG ${renderRestoreIcon()}` : "To SVG"}</button>
                <button class="cut-redraw${asset.aiRedrawn && asset.svgData ? " done" : ""}" type="button" data-redraw-slice="${asset.id}"${asset.aiProcessing ? " disabled" : ""}>${asset.aiRedrawn && asset.svgData ? `AI SVG ${renderRestoreIcon()}` : "AI redraw SVG"}</button>
              </div>
            </details>
            <button class="cut-visibility" type="button" aria-label="${asset.hidden ? "Show" : "Hide"} ${escapeHtml(asset.name)}" data-toggle-slice="${asset.id}" title="${asset.hidden ? "Show" : "Hide"}"${asset.aiProcessing ? " disabled" : ""}>${renderVisibilityIcon(asset.hidden)}</button>
            <button class="cut-settings" type="button" data-open-slice-settings="${asset.id}"${asset.aiProcessing ? " disabled" : ""}>Settings</button>
            <button class="cut-remove" type="button" aria-label="Delete ${escapeHtml(asset.name)}" data-remove-slice="${asset.id}"${asset.aiProcessing ? " disabled" : ""}>×</button>
            ${asset.aiProcessing ? `<span class="cut-ai-loading"><span class="cut-ai-loading-label">${escapeHtml(asset.aiProcessingLabel || "Requesting AI to process the slice · 0s")}</span><button class="cut-ai-cancel" type="button" data-cancel-slice-ai="${asset.id}" aria-label="Cancel AI generation" title="Cancel AI generation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></span>` : ""}
          </div>
        `).join("");
        const dropIndicator = document.createElement("div");
        dropIndicator.className = "cut-drop-indicator";
        dropIndicator.hidden = true;
        cutGrid.appendChild(dropIndicator);
        requestAnimationFrame(() => {
          cutGrid.scrollTop = scrollTop;
        });
        if (animateReorder) {
          requestAnimationFrame(() => {
            cutGrid.querySelectorAll(".cut-item").forEach((item) => item.classList.add("reordered"));
          });
        }
        cutGrid.querySelectorAll(".cut-action-menu").forEach((menu) => {
          menu.addEventListener("click", (event) => {
            event.stopPropagation();
          });
          menu.addEventListener("toggle", () => {
            if (menu.open) {
              cutGrid.querySelectorAll(".cut-action-menu[open]").forEach((otherMenu) => {
                if (otherMenu !== menu) {
                  otherMenu.open = false;
                }
              });
              requestAnimationFrame(() => positionCutActionMenu(menu));
            }
            requestAnimationFrame(() => {
              if (cutGrid.querySelector(".cut-action-menu[open]")) {
                cutGrid.classList.add("menu-open");
              } else {
                cutGrid.classList.remove("menu-open");
              }
            });
          });
        });
        cutGrid.querySelectorAll("[data-slice-id]").forEach((item) => {
          item.addEventListener("pointerdown", (event) => {
            if (getActiveSliceAsset(item.dataset.sliceId)?.aiProcessing) return;
            if (event.button !== 0 || event.target.closest("button, input, textarea, select, details, .cut-thumb")) return;
            cutReorderDrag = { pointerId: event.pointerId, sourceId: item.dataset.sliceId, targetId: item.dataset.sliceId, moved: false };
            item.setPointerCapture?.(event.pointerId);
          });
          item.addEventListener("dragstart", (event) => {
            if (getActiveSliceAsset(item.dataset.sliceId)?.aiProcessing) {
              event.preventDefault();
              return;
            }
            item.classList.add("dragging");
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", item.dataset.sliceId);
          });
          item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
            cutGrid.querySelectorAll(".drag-over").forEach((target) => target.classList.remove("drag-over"));
          });
          item.addEventListener("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            if (event.currentTarget !== item) return;
            item.classList.add("drag-over");
          });
          item.addEventListener("dragleave", () => item.classList.remove("drag-over"));
          item.addEventListener("drop", (event) => {
            event.preventDefault();
            item.classList.remove("drag-over");
            const sourceId = event.dataTransfer.getData("text/plain");
            reorderSliceAsset(sourceId, item.dataset.sliceId);
          });
          item.addEventListener("click", (event) => {
            if (event.target.closest("[data-remove-slice]")) {
              return;
            }
            const shouldSyncDrawer = sliceSettingsDrawer.classList.contains("open");
            if (event.shiftKey) {
              selectSliceRange(item.dataset.sliceId, displayAssets.map((asset) => asset.id), event.metaKey || event.ctrlKey);
            } else if (event.metaKey || event.ctrlKey) {
              toggleSliceSelection(item.dataset.sliceId);
            } else {
              selectOnlySlice(item.dataset.sliceId);
            }
            if (shouldSyncDrawer) {
              sliceSettingsId = activeSliceId;
            }
            const card = resultGrid.querySelector(".result-card.slice-mode");
            const layer = card?.querySelector(".slice-layer");
            const image = card?.querySelector(".result-canvas img");
            if (card && layer && image) {
              renderSliceOverlay(card, layer, image);
            }
            renderCutModules(manifest);
            if (shouldSyncDrawer) {
              renderSliceSettingsDrawer();
            }
          });
          item.addEventListener("contextmenu", (event) => {
            if (getActiveSliceAsset(item.dataset.sliceId)?.aiProcessing) return;
            event.preventDefault();
            if (!isSliceSelected(item.dataset.sliceId)) {
              selectOnlySlice(item.dataset.sliceId);
            } else {
              activeSliceId = item.dataset.sliceId;
            }
            refreshSliceVisibility();
            renderCutModules(manifest);
            openSliceSettingsDrawer(activeSliceId);
          });
        });
        cutGrid.querySelectorAll(".cut-thumb").forEach((thumb) => {
          thumb.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            openSliceImagePreview(thumb.dataset.sliceId);
          });
        });
        cutGrid.querySelectorAll("[data-remove-slice]").forEach((button) => {
          button.addEventListener("click", () => {
            removeSliceAsset(button.dataset.removeSlice);
          });
        });
        cutGrid.querySelectorAll("[data-cancel-slice-ai]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            cancelSliceAiRequest(button.dataset.cancelSliceAi);
          });
        });
        cutGrid.querySelectorAll("[data-toggle-slice]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation();
            const asset = getActiveSliceAsset(button.dataset.toggleSlice);
            if (!asset) return;
            recordSliceHistory();
            asset.hidden = !asset.hidden;
            scheduleWorkspaceDraftSave();
            refreshSliceVisibility();
            renderCutModules(currentManifest);
          });
        });
        cutGrid.querySelectorAll("[data-open-slice-settings]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation();
            if (!isSliceSelected(button.dataset.openSliceSettings)) {
              selectOnlySlice(button.dataset.openSliceSettings);
            } else {
              activeSliceId = button.dataset.openSliceSettings;
            }
            refreshSliceVisibility();
            renderCutModules(currentManifest);
            openSliceSettingsDrawer(activeSliceId);
          });
        });
        cutGrid.querySelectorAll("[data-transparent-slice]").forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.stopPropagation();
            button.closest(".cut-action-menu")?.removeAttribute("open");
            const asset = getActiveSliceAsset(button.dataset.transparentSlice);
            if (asset?.transparent && !asset.aiTransparent) {
              restoreSliceTransparency(asset);
            } else {
              await makeSliceTransparent(button.dataset.transparentSlice);
            }
          });
        });
        cutGrid.querySelectorAll("[data-ai-transparent-slice]").forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.stopPropagation();
            button.closest(".cut-action-menu")?.removeAttribute("open");
            const asset = getActiveSliceAsset(button.dataset.aiTransparentSlice);
            if (asset?.aiTransparent) {
              restoreSliceTransparency(asset);
            } else {
              await makeSliceAiTransparent(button.dataset.aiTransparentSlice);
            }
          });
        });
        cutGrid.querySelectorAll("[data-svg-slice]").forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.stopPropagation();
            button.closest(".cut-action-menu")?.removeAttribute("open");
            const asset = getActiveSliceAsset(button.dataset.svgSlice);
            if (asset?.svgData && !asset.aiRedrawn) {
              restoreSliceSvg(asset);
            } else {
              await convertSliceToSvg(button.dataset.svgSlice);
            }
          });
        });
        cutGrid.querySelectorAll("[data-redraw-slice]").forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.stopPropagation();
            button.closest(".cut-action-menu")?.removeAttribute("open");
            const asset = getActiveSliceAsset(button.dataset.redrawSlice);
            if (asset?.aiRedrawn && asset.svgData) {
              restoreSliceSvg(asset);
            } else {
              await redrawSliceToSvg(button.dataset.redrawSlice);
            }
          });
        });
      }

      function renderRestoreIcon() {
        return `<svg viewBox="0 0 24 24" aria-label="Restore"><path d="M9 7H4v-5"/><path d="M4.5 7.5A9 9 0 1 1 3 15"/></svg>`;
      }

      function renderVisibilityIcon(hidden) {
        return hidden
          ? `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3l18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10.6 5.2A9.8 9.8 0 0 1 12 5c5.4 0 9 7 9 7a16.7 16.7 0 0 1-2.3 3.2M6.2 6.2C4.1 7.7 3 10 3 12c0 0 3.6 7 9 7 1.4 0 2.7-.5 3.8-1.2M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>`;
      }

      function renderSliceNumberControl(asset, field, label, value) {
        const min = field === "radius" ? 0 : (field === "x" || field === "y" ? 0 : 1);
        const max = getSliceFieldMax(asset, field, currentManifest?.screen);
        const hasSharedValue = value !== null && value !== undefined;
        return `
          <label class="slice-settings-field">
            <span>${label}</span>
            <input type="number" inputmode="numeric" min="${min}" max="${max}" step="1" value="${hasSharedValue ? Math.round(Number(value) || 0) : ""}"${hasSharedValue ? "" : ' placeholder="Multiple values"'} data-slice-id="${asset.id}" data-slice-field="${field}" />
          </label>
        `;
      }

      function renderSliceCornerControl(asset, corner, label, value) {
        const hasSharedValue = value !== null && value !== undefined;
        return `
          <label class="slice-settings-field">
            <span>${label}</span>
            <input type="number" inputmode="numeric" min="0" max="${getSliceFieldMax(asset, "radius", currentManifest?.screen)}" step="1" value="${hasSharedValue ? Math.round(Number(value) || 0) : ""}"${hasSharedValue ? "" : ' placeholder="Multiple values"'} data-slice-id="${asset.id}" data-slice-corner="${corner}" />
          </label>
        `;
      }

      function openSliceSettingsDrawer(id) {
        const asset = getActiveSliceAsset(id);
        if (!asset) {
          closeSliceSettingsDrawer();
          return;
        }
        if (!isSliceSelected(id)) {
          selectOnlySlice(id);
        } else {
          activeSliceId = id;
        }
        sliceSettingsId = id;
        renderSliceSettingsDrawer();
        if (sliceSettingsPosition) {
          setSliceSettingsPosition(sliceSettingsPosition);
        } else {
          sliceSettingsDrawer.style.left = "";
          sliceSettingsDrawer.style.top = "";
          sliceSettingsDrawer.style.right = "20px";
        }
        sliceSettingsDrawer.classList.add("open");
        sliceSettingsDrawer.setAttribute("aria-hidden", "false");
      }

      function closeSliceSettingsDrawer(preserveAiCompletePreview = false) {
        if (aiCompletePreview && !preserveAiCompletePreview) {
          aiCompletePreview = null;
          refreshSliceVisibility();
        }
        sliceSettingsId = null;
        sliceSettingsDrawer.classList.remove("open");
        sliceSettingsDrawer.setAttribute("aria-hidden", "true");
      }

      async function openSliceImagePreview(id) {
        const asset = getActiveSliceAsset(id);
        if (!asset || asset.aiProcessing) return;
        try {
          const image = await loadImageElement(asset.dataUrl);
          const width = Math.max(1, image.naturalWidth || Math.round(asset.placement.width));
          const height = Math.max(1, image.naturalHeight || Math.round(asset.placement.height));
          sliceImageEditorBase.width = width;
          sliceImageEditorBase.height = height;
          sliceImageEditorMask.width = width;
          sliceImageEditorMask.height = height;
          sliceImageEditorBaseContext.clearRect(0, 0, width, height);
          sliceImageEditorBaseContext.drawImage(image, 0, 0, width, height);
          sliceImageEditorMaskContext.clearRect(0, 0, width, height);
          sliceImageEditorStage.style.setProperty("--slice-editor-aspect", String(width / height));
          sliceImageEditorStage.style.borderRadius = getSliceRadiusCssValue(asset, currentManifest?.screen);
          sliceImageEditorStage.style.overflow = "hidden";
          const initialBrushSize = Math.round(clampNumber(Math.min(width, height) * 0.04, 2, 24, 8));
          sliceImageEditorState = {
            assetId: id,
            tool: "brush",
            brushSize: initialBrushSize,
            dirty: false,
            drawing: false,
            pointerId: null,
            lastPoint: null,
            processing: false,
            hasMask: false,
            progressLabel: "",
            controller: null,
            progressId: null,
            pendingAiInpaintRawFullDataUrl: null
          };
          sliceImageEditorSize.value = String(initialBrushSize);
          sliceImageEditorUnsaved.hidden = true;
          updateSliceImageEditorUi();
          sliceImagePreview.classList.add("open");
          sliceImagePreview.setAttribute("aria-hidden", "false");
        } catch (error) {
          setStatus(`Cannot open the slice editor: ${error.message || String(error)}`, "error");
        }
      }

      function finishCloseSliceImageEditor() {
        sliceImageEditorStage.classList.remove("ai-processing");
        sliceImagePreview.classList.remove("open");
        sliceImagePreview.setAttribute("aria-hidden", "true");
        sliceImageEditorUnsaved.hidden = true;
        sliceImageEditorBaseContext.clearRect(0, 0, sliceImageEditorBase.width, sliceImageEditorBase.height);
        sliceImageEditorMaskContext.clearRect(0, 0, sliceImageEditorMask.width, sliceImageEditorMask.height);
        sliceImageEditorState = null;
      }

      function requestCloseSliceImageEditor() {
        if (!sliceImageEditorState || sliceImageEditorState.processing) return;
        if (sliceImageEditorState?.dirty) {
          sliceImageEditorUnsaved.hidden = false;
          return;
        }
        finishCloseSliceImageEditor();
      }

      function hideSliceImageEditorUnsavedDialog() {
        sliceImageEditorUnsaved.hidden = true;
      }

      async function saveSliceImageEditor() {
        const asset = getActiveSliceAsset(sliceImageEditorState?.assetId);
        if (!asset || !sliceImageEditorState?.dirty || sliceImageEditorState.processing) return false;
        const activeImage = getActiveResultImage();
        const originalDataUrl = asset.originalDataUrl || asset.dataUrl;
        const savedDataUrl = sliceImageEditorBase.toDataURL("image/png");
        recordSliceHistory();
        asset.dataUrl = savedDataUrl;
        asset.originalDataUrl = originalDataUrl;
        asset.transparentDataUrl = null;
        asset.aiTransparentDataUrl = null;
        asset.aiTransparentPlacement = null;
        asset.aiCompletedDataUrl = asset.dataUrl;
        asset.aiCompletedPlacement = { ...asset.placement };
        asset.aiRedrawnPlacement = null;
        asset.transparent = false;
        asset.aiTransparent = false;
        asset.aiCompleted = true;
        asset.aiRedrawn = false;
        asset.svgData = null;
        asset.lastAiOperation = "complete";
        asset.isAiProcessedVariant = false;
        asset.processedResetConfirmed = false;
        delete asset.transparencyRestoreState;
        delete asset.transparencyRestoreDataUrl;
        delete asset.svgRestoreState;
        delete asset.aiCompleteSourceAssetId;
        if (
          sliceImageEditorState.pendingAiInpaintRawFullDataUrl
          && activeImage?.sliceManifest?.assets
        ) {
          installAiInpaintResultPair({
            assets: activeImage.sliceManifest.assets,
            sourceAsset: asset,
            compositeDataUrl: savedDataUrl,
            rawFullDataUrl: sliceImageEditorState.pendingAiInpaintRawFullDataUrl
          });
        }
        sliceImageEditorState.dirty = false;
        activeSliceId = asset.id;
        refreshSliceVisibility();
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
        updateSliceImageEditorUi();
        return true;
      }

      function setSliceImageEditorTool(tool) {
        if (!sliceImageEditorState || !["brush", "eraser"].includes(tool)) return;
        sliceImageEditorState.tool = tool;
        updateSliceImageEditorUi();
      }

      function setSliceImageEditorBrushSize(size) {
        if (!sliceImageEditorState) return;
        sliceImageEditorState.brushSize = Math.round(clampNumber(size, 1, 200, 24));
        sliceImageEditorSize.value = String(sliceImageEditorState.brushSize);
        updateSliceImageEditorUi();
      }

      function updateSliceImageEditorUi() {
        if (!sliceImageEditorState) return;
        sliceImageEditorStage.classList.toggle("ai-processing", sliceImageEditorState.processing);
        sliceImageEditorToolButtons.forEach((button) => {
          button.classList.toggle("active", button.dataset.sliceEditorTool === sliceImageEditorState.tool);
          button.disabled = sliceImageEditorState.processing;
        });
        sliceImageEditorSize.disabled = sliceImageEditorState.processing;
        sliceImageEditorSizeValue.value = `${sliceImageEditorState.brushSize}px`;
        sliceImageEditorComplete.disabled = sliceImageEditorState.processing || !sliceImageEditorState.hasMask;
        sliceImageEditorComplete.textContent = sliceImageEditorState.processing
          ? (sliceImageEditorState.progressLabel || "Requesting AI background completion · 0s")
          : "AI Inpaint";
        sliceImageEditorCancelAi.hidden = !sliceImageEditorState.processing;
        sliceImageEditorSave.disabled = sliceImageEditorState.processing || !sliceImageEditorState.dirty;
        sliceImagePreviewClose.disabled = sliceImageEditorState.processing;
      }

      function getSliceImageEditorPoint(event) {
        const rect = sliceImageEditorMask.getBoundingClientRect();
        const scaleX = sliceImageEditorBase.width / rect.width;
        const scaleY = sliceImageEditorBase.height / rect.height;
        return {
          x: clampNumber((event.clientX - rect.left) * scaleX, 0, sliceImageEditorBase.width, 0),
          y: clampNumber((event.clientY - rect.top) * scaleY, 0, sliceImageEditorBase.height, 0)
        };
      }

      function drawSliceImageEditorSegment(context, from, to, size) {
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = size;
        context.beginPath();
        if (from) {
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
          context.stroke();
          return;
        }
        context.arc(to.x, to.y, size / 2, 0, Math.PI * 2);
        context.fill();
      }

      function drawSliceImageEditorStroke(event) {
        if (!sliceImageEditorState || sliceImageEditorState.processing) return;
        const point = getSliceImageEditorPoint(event);
        const previousPoint = sliceImageEditorState.lastPoint;
        const size = sliceImageEditorState.brushSize;
        if (sliceImageEditorState.tool === "eraser") {
          [sliceImageEditorBaseContext, sliceImageEditorMaskContext].forEach((context) => {
            context.save();
            context.globalCompositeOperation = "destination-out";
            context.strokeStyle = "rgba(0, 0, 0, 1)";
            context.fillStyle = "rgba(0, 0, 0, 1)";
            drawSliceImageEditorSegment(context, previousPoint, point, size);
            context.restore();
          });
          sliceImageEditorState.dirty = true;
        } else {
          sliceImageEditorMaskContext.save();
          sliceImageEditorMaskContext.globalCompositeOperation = "source-over";
          sliceImageEditorMaskContext.strokeStyle = "rgba(255, 64, 64, 1)";
          sliceImageEditorMaskContext.fillStyle = "rgba(255, 64, 64, 1)";
          drawSliceImageEditorSegment(sliceImageEditorMaskContext, previousPoint, point, size);
          sliceImageEditorMaskContext.restore();
          sliceImageEditorState.hasMask = true;
        }
        sliceImageEditorState.lastPoint = point;
        updateSliceImageEditorUi();
      }

      function hasSliceImageEditorMask() {
        if (!sliceImageEditorState || !sliceImageEditorMask.width || !sliceImageEditorMask.height) return false;
        const pixels = sliceImageEditorMaskContext.getImageData(0, 0, sliceImageEditorMask.width, sliceImageEditorMask.height).data;
        for (let index = 3; index < pixels.length; index += 4) {
          if (pixels[index] > 0) return true;
        }
        return false;
      }

      function createSliceImageEditorMaskDataUrl() {
        const width = sliceImageEditorMask.width;
        const height = sliceImageEditorMask.height;
        const source = sliceImageEditorMaskContext.getImageData(0, 0, width, height);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Cannot create the AI completion mask");
        const output = context.createImageData(width, height);
        for (let index = 0; index < source.data.length; index += 4) {
          const value = source.data[index + 3];
          output.data[index] = value;
          output.data[index + 1] = value;
          output.data[index + 2] = value;
          output.data[index + 3] = 255;
        }
        context.putImageData(output, 0, 0);
        return canvas.toDataURL("image/png");
      }

      function buildSliceImageEditorCompletePrompt(asset) {
        return [
          `Reconstruct the painted region in the edited slice named "${asset?.name || "ui_asset"}".`,
          "Reference image 1 is the complete current edited image. Transparent pixels are intentional erased pixels and must be used as the actual source state.",
          "Reference image 2 is a black-and-white mask aligned pixel-for-pixel with image 1. Reconstruct only its white pixels; black pixels are context and must remain unchanged.",
          "Use the full first image to infer colors, texture, lighting, perspective, and missing content.",
          "Match the protected source pixels' white balance, color temperature, tint, exposure, gamma, contrast, saturation, black point, and white point exactly.",
          "Do not apply global relighting, HDR, auto-enhancement, cinematic grading, sharpening, or color styling.",
          "Return one full image at the same aspect ratio without cropping, resizing, adding text, or redesigning the asset."
        ].join("\n");
      }

      async function compositeSliceImageEditorMask(sourceDataUrl, completedDataUrl, maskDataUrl) {
        const width = sliceImageEditorBase.width;
        const height = sliceImageEditorBase.height;
        const compositeDataUrl = await compositeAiInpaintResult(sourceDataUrl, completedDataUrl, maskDataUrl);
        const composite = await loadImageElement(compositeDataUrl);
        sliceImageEditorBaseContext.clearRect(0, 0, width, height);
        sliceImageEditorBaseContext.drawImage(composite, 0, 0, width, height);
        sliceImageEditorMaskContext.clearRect(0, 0, width, height);
        sliceImageEditorState.hasMask = false;
      }

      async function makeSliceImageEditorAiComplete() {
        const editorState = sliceImageEditorState;
        const asset = getActiveSliceAsset(editorState?.assetId);
        if (!editorState || !asset || editorState.processing) return;
        if (!editorState.hasMask || !hasSliceImageEditorMask()) {
          editorState.hasMask = false;
          updateSliceImageEditorUi();
          setStatus("Paint the area that needs AI completion with the brush first.", "warning");
          return;
        }
        editorState.processing = true;
        editorState.progressLabel = "Requesting AI background completion · 0s";
        editorState.progressId = createAiProgressId("editor_complete");
        editorState.controller = new AbortController();
        setBusy(true, `Requesting AI background completion: ${asset.name}`, true);
        updateSliceImageEditorUi();
        const stopProgress = startAiProgressPolling(editorState.progressId, (progress) => {
          if (sliceImageEditorState !== editorState || !editorState.processing) return;
          const message = progress?.message && !/AI processing complete/.test(progress.message)
            ? progress.message
            : "Requesting AI background completion";
          editorState.progressLabel = `${message} · ${progress.elapsedSeconds}s`;
          updateSliceImageEditorUi();
        });
        try {
          const sourceDataUrl = sliceImageEditorBase.toDataURL("image/png");
          const maskDataUrl = createSliceImageEditorMaskDataUrl();
          const image = await requestAiInpaint({
            fetchBackend,
            signal: editorState.controller.signal,
            sourceDataUrl,
            maskDataUrl,
            name: asset.name,
            width: sliceImageEditorBase.width,
            height: sliceImageEditorBase.height,
            prompt: buildSliceImageEditorCompletePrompt(asset),
            progressId: editorState.progressId
          });
          editorState.progressLabel = "Compositing the completion result locally";
          updateSliceImageEditorUi();
          await compositeSliceImageEditorMask(sourceDataUrl, image.dataUrl, maskDataUrl);
          editorState.pendingAiInpaintRawFullDataUrl = image.dataUrl;
          editorState.dirty = true;
          hideStatus();
        } catch (error) {
          if (error?.name !== "AbortError") {
            setStatus(`AI completion failed: ${error.message || String(error)}`, "error");
          }
        } finally {
          stopProgress();
          if (sliceImageEditorState === editorState) {
            sliceImageEditorState.processing = false;
            sliceImageEditorState.progressLabel = "";
            sliceImageEditorState.controller = null;
            sliceImageEditorState.progressId = null;
            updateSliceImageEditorUi();
          }
          releaseBusyIfIdle();
        }
      }

      function cancelSliceImageEditorAiComplete() {
        if (!sliceImageEditorState?.processing) return;
        if (sliceImageEditorState.progressId) {
          fetchBackend(`/api/progress/${encodeURIComponent(sliceImageEditorState.progressId)}/cancel`, { method: "POST" }).catch(() => {});
        }
        sliceImageEditorState.controller?.abort();
        sliceImageEditorState.processing = false;
        sliceImageEditorState.progressLabel = "";
        updateSliceImageEditorUi();
        hideStatus();
        releaseBusyIfIdle();
      }

      function clampSliceSettingsPosition(left, top, width, height) {
        const margin = 12;
        const maxLeft = Math.max(margin, window.innerWidth - width - margin);
        const maxTop = Math.max(margin, window.innerHeight - height - margin);
        return {
          left: Math.round(clampNumber(left, margin, maxLeft, margin)),
          top: Math.round(clampNumber(top, margin, maxTop, margin))
        };
      }

      function setSliceSettingsPosition(position) {
        const rect = sliceSettingsDrawer.getBoundingClientRect();
        const next = clampSliceSettingsPosition(position.left, position.top, rect.width || 340, rect.height || 360);
        sliceSettingsPosition = next;
        sliceSettingsDrawer.style.left = `${next.left}px`;
        sliceSettingsDrawer.style.top = `${next.top}px`;
        sliceSettingsDrawer.style.right = "auto";
      }

      function renderSliceSettingsDrawer() {
        const selectedAssets = getSelectedSliceAssets();
        const asset = selectedAssets.find((entry) => entry.id === (sliceSettingsId || activeSliceId)) || selectedAssets[0];
        if (!asset || selectedAssets.length === 0) {
          closeSliceSettingsDrawer();
          return;
        }
        const isMultiSelection = selectedAssets.length > 1;
        const isAnyProcessing = selectedAssets.some((entry) => entry.aiProcessing);
        const hasLockedGeometry = selectedAssets.some((entry) => isLockedAiCompleteAsset(entry));
        const getSharedValue = (field) => {
          const values = selectedAssets.map((entry) => field === "radius" ? getSliceRadius(entry, currentManifest?.screen) : entry.placement[field]);
          return values.every((value) => value === values[0]) ? values[0] : null;
        };
        const getSharedCornerValue = (corner) => {
          const values = selectedAssets.map((entry) => getSliceRadii(entry, currentManifest?.screen)[corner]);
          return values.every((value) => value === values[0]) ? values[0] : null;
        };
        sliceSettingsTitle.textContent = isMultiSelection ? `${selectedAssets.length} slices selected` : asset.name;
        sliceSettingsBody.innerHTML = `
          <label class="slice-settings-field slice-settings-name-field">
            <span>Title</span>
            <input type="text" value="${isMultiSelection ? "" : escapeHtml(asset.name)}"${isMultiSelection ? ' placeholder="Enter to apply to all"' : ""} data-slice-name="${asset.id}" maxlength="80"${isAnyProcessing ? " disabled" : ""} />
          </label>
          <div class="slice-settings-grid">
            ${renderSliceNumberControl(asset, "x", "X", getSharedValue("x"))}
            ${renderSliceNumberControl(asset, "y", "Y", getSharedValue("y"))}
            ${renderSliceNumberControl(asset, "width", "Width", getSharedValue("width"))}
            ${renderSliceNumberControl(asset, "height", "Height", getSharedValue("height"))}
            ${renderSliceCornerControl(asset, "topLeft", "Top left", getSharedCornerValue("topLeft"))}
            ${renderSliceCornerControl(asset, "topRight", "Top right", getSharedCornerValue("topRight"))}
            ${renderSliceCornerControl(asset, "bottomRight", "Bottom right", getSharedCornerValue("bottomRight"))}
            ${renderSliceCornerControl(asset, "bottomLeft", "Bottom left", getSharedCornerValue("bottomLeft"))}
            ${isMultiSelection ? "" : `<div class="slice-ai-complete-action">
              <span>Occlusion completion</span>
              <button class="${aiCompletePreview?.sliceId === asset.id ? "confirm" : ""}" type="button" data-preview-ai-complete="${asset.id}"${asset.aiProcessing ? " disabled" : ""}>${asset.aiProcessing ? escapeHtml(asset.aiProcessingLabel || "AI processing") : (aiCompletePreview?.sliceId === asset.id ? "Confirm the red areas to complete" : "AI Inpaint")}</button>
            </div>`}
          </div>
          <div class="slice-settings-note">${isMultiSelection ? `The edited value will be applied to all ${selectedAssets.length} selected slices.` : "AI completion first marks areas that overlap other slices in red; after confirmation only the red areas are replaced and all other pixels stay unchanged."}</div>
          <button class="slice-settings-delete" type="button" data-delete-selected-slices${isAnyProcessing ? " disabled" : ""}>${isMultiSelection ? `Delete the ${selectedAssets.length} selected slices` : "Delete slice"}</button>
        `;
        const nameInput = sliceSettingsBody.querySelector("[data-slice-name]");
        const updateName = () => {
          const normalizedName = normalizeSliceAssetName(nameInput.value);
          if (!normalizedName) {
            nameInput.value = isMultiSelection ? "" : asset.name;
            setStatus("Slice names may only use English letters, digits and underscores, and must contain an English letter.", "warning");
            return;
          }
          const selectedIds = new Set(selectedAssets.map((entry) => entry.id));
          const usedNames = new Set(
            (getActiveResultImage()?.sliceManifest?.assets || [])
              .filter((entry) => !selectedIds.has(entry.id))
              .map((entry) => entry.name)
          );
          const nextNames = selectedAssets.map(() => reserveSliceAssetName(normalizedName, usedNames));
          if (selectedAssets.every((entry, index) => entry.name === nextNames[index])) {
            nameInput.value = isMultiSelection ? "" : nextNames[0];
            return;
          }
          recordSliceHistory();
          selectedAssets.forEach((entry, index) => {
            entry.name = nextNames[index];
          });
          scheduleWorkspaceDraftSave();
          if (!isMultiSelection) {
            nameInput.value = nextNames[0];
            sliceSettingsTitle.textContent = nextNames[0];
          } else {
            nameInput.value = "";
          }
          renderCutModules(currentManifest);
        };
        nameInput.addEventListener("change", updateName);
        nameInput.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            nameInput.blur();
          }
        });
        sliceSettingsBody.querySelectorAll("[data-slice-field]").forEach((input) => {
          if (isAnyProcessing || (hasLockedGeometry && input.dataset.sliceField !== "radius")) input.disabled = true;
          input.addEventListener("focus", () => {
            if (!input.dataset.historyRecorded) {
              recordSliceHistory();
              input.dataset.historyRecorded = "true";
            }
          });
          input.addEventListener("input", () => {
            updateSelectedSliceGeometry(input.dataset.sliceField, input.value, false);
          });
          input.addEventListener("change", async () => {
            await updateSelectedSliceGeometry(input.dataset.sliceField, input.value, true);
          });
          input.addEventListener("keydown", async (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              input.blur();
            }
          });
        });
        sliceSettingsBody.querySelectorAll("[data-slice-corner]").forEach((input) => {
          if (isAnyProcessing) input.disabled = true;
          input.addEventListener("focus", () => {
            if (!input.dataset.historyRecorded) {
              recordSliceHistory();
              input.dataset.historyRecorded = "true";
            }
          });
          input.addEventListener("input", () => {
            updateSelectedSliceCornerRadius(input.dataset.sliceCorner, input.value, false);
          });
          input.addEventListener("change", () => {
            updateSelectedSliceCornerRadius(input.dataset.sliceCorner, input.value, true);
          });
          input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              input.blur();
            }
          });
        });
        sliceSettingsBody.querySelector("[data-preview-ai-complete]")?.addEventListener("click", async (event) => {
          const id = event.currentTarget.dataset.previewAiComplete;
          if (getActiveSliceAsset(id)?.aiProcessing) return;
          if (aiCompletePreview?.sliceId === id) {
            const regions = aiCompletePreview.regions;
            aiCompletePreview = { ...aiCompletePreview, processing: true };
            closeSliceSettingsDrawer(true);
            refreshSliceVisibility();
            await makeSliceAiComplete(id, regions);
            return;
          }
          const regions = getSliceOverlapRegions(id);
          if (regions.length === 0) {
            setStatus("This slice does not overlap other slices, so AI completion cannot run.", "warning");
            return;
          }
          aiCompletePreview = { sliceId: id, regions };
          activeSliceId = id;
          refreshSliceVisibility();
          renderSliceSettingsDrawer();
          setStatus(`Marked ${regions.length} overlapping areas in red; click AI Complete again after confirming.`);
        });
        sliceSettingsBody.querySelector("[data-delete-selected-slices]")?.addEventListener(
          "click",
          () => removeSelectedSliceAssets(true)
        );
      }

      function renderEmptyCutModules() {
        cutSection.classList.remove("open");
        closeSliceSettingsDrawer();
        exportSlicesButton.disabled = true;
        transparentAllButton.disabled = true;
        cutGrid.innerHTML = "";
      }

      function ensureSliceState(manifest) {
        (manifest.resultImages || []).forEach(ensureImageSliceState);
      }

      function ensureImageSliceState(image) {
        if (!image) {
          return;
        }
        if (!image.sliceManifest) {
          image.sliceManifest = { assets: [] };
        }
        if (!Array.isArray(image.sliceManifest.assets)) {
          image.sliceManifest.assets = [];
        }
        normalizeSliceAssetNames(image.sliceManifest.assets);
      }

      function cloneSliceAssets(assets) {
        return assets.map((asset) => ({
          ...asset,
          placement: asset.placement ? { ...asset.placement } : asset.placement,
          aiProcessing: false,
          aiProcessingLabel: "",
          aiProgressLogs: []
        }));
      }

      function createSliceHistoryEntry(activeImage, metadata = {}) {
        return {
          imageId: activeImage.id,
          assets: cloneSliceAssets(activeImage.sliceManifest?.assets || []),
          ...metadata
        };
      }

      function getSliceHistoryMetadata(entry) {
        if (entry?.actionType !== "ai-bbox-batch") return {};
        return {
          actionType: entry.actionType,
          batchId: entry.batchId,
          addedCount: entry.addedCount
        };
      }

      function clearSliceHistory() {
        sliceUndoStack.length = 0;
        sliceRedoStack.length = 0;
        selectedSliceIds.clear();
        sliceSelectionAnchorId = null;
      }

      function recordSliceHistory(metadata = {}) {
        const activeImage = getActiveResultImage();
        if (!activeImage) return;
        sliceUndoStack.push(createSliceHistoryEntry(activeImage, metadata));
        if (sliceUndoStack.length > 50) sliceUndoStack.shift();
        sliceRedoStack.length = 0;
      }

      function pasteCopiedSliceAsset(activeImage) {
        const source = sliceClipboard?.asset;
        const screen = currentManifest?.screen;
        if (!source || !screen) return;
        ensureImageSliceState(activeImage);
        recordSliceHistory();
        const assets = activeImage.sliceManifest.assets;
        const placement = normalizeSlicePlacement(source.placement, currentManifest?.screen);
        const offsetPlacement = {
          ...placement,
          x: clampNumber(placement.x + 10, 0, screen.width - placement.width, placement.x),
          y: clampNumber(placement.y + 10, 0, screen.height - placement.height, placement.y)
        };
        const name = reserveSliceAssetName(
          `${source.name || "slice"}_copy`,
          new Set(assets.map((asset) => asset.name))
        );
        const duplicate = {
          ...source,
          id: `slice_${activeResultIndex + 1}_${Date.now().toString(36)}_${assets.length + 1}`,
          name,
          placement: offsetPlacement,
          aiCompleteSourceAssetId: null,
          aiProcessing: false,
          aiProcessingLabel: "",
          aiProgressLogs: []
        };
        assets.push(duplicate);
        selectOnlySlice(duplicate.id);
        if (sliceSettingsDrawer.classList.contains("open")) {
          sliceSettingsId = duplicate.id;
          renderSliceSettingsDrawer();
        }
        refreshSliceVisibility();
        const card = resultGrid.querySelector(".result-card.slice-mode");
        const layer = card?.querySelector(".slice-layer");
        const image = card?.querySelector(".result-canvas img");
        if (card && layer && image) renderSliceOverlay(card, layer, image);
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
      }

      function restoreSliceHistory(entry) {
        const image = currentManifest?.resultImages?.find((item) => item.id === entry.imageId);
        if (!image) return;
        ensureImageSliceState(image);
        image.sliceManifest.assets = cloneSliceAssets(entry.assets);
        activeSliceId = image.sliceManifest.assets.at(-1)?.id || null;
        selectedSliceIds.clear();
        if (activeSliceId) selectedSliceIds.add(activeSliceId);
        sliceSelectionAnchorId = activeSliceId;
        const card = resultGrid.querySelector(".result-card.slice-mode");
        const layer = card?.querySelector(".slice-layer");
        const previewImage = card?.querySelector(".result-canvas img");
        refreshSliceVisibility();
        if (card && layer && previewImage) renderSliceOverlay(card, layer, previewImage);
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
      }

      function undoSliceChange() {
        const activeImage = getActiveResultImage();
        const previousIndex = activeImage ? sliceUndoStack.findLastIndex((entry) => entry.imageId === activeImage.id) : -1;
        const previous = previousIndex >= 0 ? sliceUndoStack[previousIndex] : null;
        if (!activeImage || !previous) return;
        if (previous.actionType === "ai-bbox-batch") {
          if (!window.confirm(`Undoing will remove the ${previous.addedCount} slice areas added by this AI detection. Confirm undo?`)) {
            return;
          }
        }
        sliceUndoStack.splice(previousIndex, 1);
        sliceRedoStack.push(createSliceHistoryEntry(activeImage, getSliceHistoryMetadata(previous)));
        restoreSliceHistory(previous);
      }

      function redoSliceChange() {
        const activeImage = getActiveResultImage();
        const nextIndex = activeImage ? sliceRedoStack.findLastIndex((entry) => entry.imageId === activeImage.id) : -1;
        const next = nextIndex >= 0 ? sliceRedoStack.splice(nextIndex, 1)[0] : null;
        if (!activeImage || !next) return;
        sliceUndoStack.push(createSliceHistoryEntry(activeImage, getSliceHistoryMetadata(next)));
        restoreSliceHistory(next);
      }

      function getActiveResultImage() {
        if (!currentManifest?.resultImages?.length) {
          return null;
        }
        return currentManifest.resultImages[activeResultIndex] || currentManifest.resultImages[0];
      }

      function bindSliceLayer(card, layer, image) {
        if (!card || !layer || !image) {
          return;
        }
        layer.addEventListener("pointerdown", (event) => {
          if (event.button !== 0 && event.button !== 2) {
            return;
          }
          if (event.button === 0) {
            layer.tabIndex = -1;
            layer.focus({ preventScroll: true });
          }
          const imageRect = image.getBoundingClientRect();
          if (event.button === 2) {
            const sliceBox = event.target.closest("[data-slice-id]");
            if (sliceBox) {
              event.preventDefault();
              event.stopPropagation();
              if (!isSliceSelected(sliceBox.dataset.sliceId)) {
                selectOnlySlice(sliceBox.dataset.sliceId);
              } else {
                activeSliceId = sliceBox.dataset.sliceId;
              }
              openSliceSettingsDrawer(activeSliceId);
              renderSliceOverlay(card, layer, image);
              renderCutModules(currentManifest);
            }
            return;
          }
          const settingsTarget = event.target.closest("[data-slice-settings]");
          if (settingsTarget) {
            event.preventDefault();
            event.stopPropagation();
            if (!isSliceSelected(settingsTarget.dataset.sliceSettings)) {
              selectOnlySlice(settingsTarget.dataset.sliceSettings);
            } else {
              activeSliceId = settingsTarget.dataset.sliceSettings;
            }
            openSliceSettingsDrawer(activeSliceId);
            renderSliceOverlay(card, layer, image);
            renderCutModules(currentManifest);
            return;
          }
          const radiusHandle = event.target.closest("[data-slice-radius-handle]");
          const handle = event.target.closest("[data-slice-handle]");
          const sliceBox = event.target.closest("[data-slice-id]");
          if (sliceBox) {
            let asset = getActiveSliceAsset(sliceBox.dataset.sliceId);
            if (!asset || asset.aiProcessing) {
              return;
            }
            if (
              !radiusHandle
              && !handle
              && (event.shiftKey || event.metaKey || event.ctrlKey)
            ) {
              event.preventDefault();
              event.stopPropagation();
              if (event.shiftKey) {
                const orderedIds = (getActiveResultImage()?.sliceManifest?.assets || [])
                  .map((item) => item.id);
                selectSliceRange(asset.id, orderedIds, event.metaKey || event.ctrlKey);
              } else {
                toggleSliceSelection(asset.id);
              }
              if (sliceSettingsDrawer.classList.contains("open")) {
                sliceSettingsId = activeSliceId;
                renderSliceSettingsDrawer();
              }
              renderSliceOverlay(card, layer, image);
              renderCutModules(currentManifest);
              return;
            }
            if (radiusHandle) {
              event.preventDefault();
              event.stopPropagation();
              recordSliceHistory();
              selectOnlySlice(asset.id);
              if (sliceSettingsDrawer.classList.contains("open")) {
                sliceSettingsId = activeSliceId;
                renderSliceSettingsDrawer();
              }
              layer.setPointerCapture(event.pointerId);
              const point = pointToScreenCoords(event.clientX, event.clientY, imageRect, currentManifest.screen);
              const corner = radiusHandle.dataset.sliceRadiusHandle;
              const cornerKey = {
                nw: "topLeft",
                ne: "topRight",
                se: "bottomRight",
                sw: "bottomLeft"
              }[corner];
              const startRadii = getSliceRadii(asset, currentManifest.screen);
              sliceEdit = {
                id: asset.id,
                pointerId: event.pointerId,
                mode: "radius",
                corner,
                cornerKey,
                startX: point.x,
                startY: point.y,
                startRadius: startRadii[cornerKey],
                startRadii,
                changed: false
              };
              renderSliceOverlay(card, layer, image);
              renderCutModules(currentManifest);
              return;
            }
            const lockedAiComplete = isLockedAiCompleteAsset(asset);
            if (!lockedAiComplete && hasProcessedSliceResult(asset) && !asset.processedResetConfirmed) {
              if (!confirmProcessedSliceReset(asset)) {
                return;
              }
              asset.processedResetConfirmed = true;
              asset.isAiProcessedVariant = false;
              sliceEdit = null;
              selectOnlySlice(asset.id);
              event.preventDefault();
              event.stopPropagation();
              if (sliceSettingsDrawer.classList.contains("open")) {
                sliceSettingsId = activeSliceId;
                renderSliceSettingsDrawer();
              }
              renderSliceOverlay(card, layer, image);
              renderCutModules(currentManifest);
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (!lockedAiComplete) recordSliceHistory();
            selectOnlySlice(asset.id);
            if (sliceSettingsDrawer.classList.contains("open")) {
              sliceSettingsId = activeSliceId;
              renderSliceSettingsDrawer();
            }
            layer.setPointerCapture(event.pointerId);
            const point = pointToScreenCoords(event.clientX, event.clientY, imageRect, currentManifest.screen);
            sliceEdit = {
              id: asset.id,
              pointerId: event.pointerId,
              mode: handle?.dataset.sliceHandle || "move",
              startX: point.x,
              startY: point.y,
              original: { ...asset.placement },
              aiCompleteSourceAssetId: lockedAiComplete ? asset.id : null,
              changed: false
            };
            renderSliceOverlay(card, layer, image);
            renderCutModules(currentManifest);
            return;
          }
          if (!isPointInsideRect(event.clientX, event.clientY, imageRect)) {
            return;
          }
          event.preventDefault();
          clearSliceSelection(false);
          layer.setPointerCapture(event.pointerId);
          const startPoint = pointToScreenCoords(event.clientX, event.clientY, imageRect, currentManifest.screen);
          sliceDraft = {
            pointerId: event.pointerId,
            startX: startPoint.x,
            startY: startPoint.y,
            currentX: startPoint.x,
            currentY: startPoint.y
          };
          renderSliceOverlay(card, layer, image);
        });

        function applySlicePointerEdit(event) {
          if (!sliceEdit) return;
          const imageRect = image.getBoundingClientRect();
          const point = pointToScreenCoords(event.clientX, event.clientY, imageRect, currentManifest.screen);
          let asset = getActiveSliceAsset(sliceEdit.id);
          if (!asset) return;
          if (sliceEdit.mode === "radius") {
            const nextRadius = calculateDraggedSliceRadius(
              sliceEdit,
              point,
              getSliceFieldMax(asset, "radius", currentManifest.screen)
            );
            if (nextRadius === getSliceRadii(asset, currentManifest.screen)[sliceEdit.cornerKey]) {
              return;
            }
            sliceEdit.changed = true;
            setSliceCornerRadius(asset, sliceEdit.cornerKey, nextRadius, currentManifest.screen);
            renderSliceOverlay(card, layer, image);
            if (sliceSettingsDrawer.classList.contains("open") && sliceSettingsId === asset.id) {
              renderSliceSettingsDrawer();
            }
            return;
          }
          let nextPlacement = normalizeEditedPlacement(sliceEdit, point, currentManifest.screen);
          let changed = hasSlicePlacementChanged(sliceEdit.original, nextPlacement);
          if (!changed) return;
          if (sliceEdit.aiCompleteSourceAssetId) {
            recordSliceHistory();
            asset = getOrCreateAiCompleteEditableCopy(getActiveResultImage(), asset);
            activeSliceId = asset.id;
            setStatus(typeof t === "function" ? t("status_ai_repair_kept", "AI full image kept; a pre-repair copy was created for repositioning") : "AI full image kept; a pre-repair copy was created for repositioning", "warning");
            sliceEdit.id = asset.id;
            sliceEdit.original = { ...asset.placement };
            sliceEdit.aiCompleteSourceAssetId = null;
            nextPlacement = normalizeEditedPlacement(sliceEdit, point, currentManifest.screen);
            changed = hasSlicePlacementChanged(sliceEdit.original, nextPlacement);
            if (sliceSettingsDrawer.classList.contains("open")) {
              sliceSettingsId = asset.id;
              renderSliceSettingsDrawer();
            }
            renderCutModules(currentManifest);
          }
          sliceEdit.changed = true;
          asset.placement = nextPlacement;
          renderSliceOverlay(card, layer, image);
          if (sliceSettingsDrawer.classList.contains("open") && sliceSettingsId === asset.id) {
            renderSliceSettingsDrawer();
          }
        }

        layer.addEventListener("pointermove", (event) => {
          if (sliceEdit) {
            applySlicePointerEdit(event);
            return;
          }
          if (!sliceDraft) {
            return;
          }
          const imageRect = image.getBoundingClientRect();
          const point = pointToScreenCoords(event.clientX, event.clientY, imageRect, currentManifest.screen);
          sliceDraft.currentX = point.x;
          sliceDraft.currentY = point.y;
          renderSliceOverlay(card, layer, image);
        });

        layer.addEventListener("pointerup", async (event) => {
          if (sliceEdit) {
            applySlicePointerEdit(event);
            layer.releasePointerCapture(event.pointerId);
            const editId = sliceEdit.id;
            const changed = sliceEdit.changed;
            const editMode = sliceEdit.mode;
            sliceEdit = null;
            if (!changed) {
              return;
            }
            if (editMode === "radius") {
              scheduleWorkspaceDraftSave();
            } else {
              await updateSliceAssetCrop(editId);
            }
            refreshSliceVisibility();
            renderCutModules(currentManifest);
            return;
          }
          if (!sliceDraft) {
            return;
          }
          layer.releasePointerCapture(event.pointerId);
          const imageRect = image.getBoundingClientRect();
          const endPoint = pointToScreenCoords(
            clampNumber(event.clientX, imageRect.left, imageRect.right, imageRect.right),
            clampNumber(event.clientY, imageRect.top, imageRect.bottom, imageRect.bottom),
            imageRect,
            currentManifest.screen
          );
          sliceDraft.currentX = endPoint.x;
          sliceDraft.currentY = endPoint.y;
          const draft = normalizeDraftRect(sliceDraft, currentManifest.screen);
          sliceDraft = null;
          if (draft.width < 8 || draft.height < 8) {
            renderSliceOverlay(card, layer, image);
            return;
          }
          await addSliceAsset(draft);
        });

        layer.addEventListener("pointercancel", () => {
          if (sliceEdit) {
            const asset = getActiveSliceAsset(sliceEdit.id);
            if (asset && sliceEdit.mode === "radius") {
              asset.radii = { ...sliceEdit.startRadii };
              asset.radius = Math.max(...Object.values(asset.radii));
            } else if (asset) {
              asset.placement = { ...sliceEdit.original };
            }
          }
          sliceDraft = null;
          sliceEdit = null;
          renderSliceOverlay(card, layer, image);
        });
      }

      function renderSliceOverlay(card, layer, image) {
        if (!card || !layer || !image || !currentManifest?.screen) {
          return;
        }
        const activeImage = getActiveResultImage();
        ensureImageSliceState(activeImage);
        const imageRect = image.getBoundingClientRect();
        const scaleX = imageRect.width / currentManifest.screen.width;
        const scaleY = imageRect.height / currentManifest.screen.height;
        const assets = activeImage?.sliceManifest?.assets || [];

        const visibleAssets = repairPreviewActive ? [] : assets.filter((asset) => !asset.hidden);
        const cutouts = visibleAssets.map((asset) => {
          const placement = asset.placement;
          return `
            <div class="slice-cutout" style="
              left:${placement.x * scaleX}px;
              top:${placement.y * scaleY}px;
              width:${placement.width * scaleX}px;
              height:${placement.height * scaleY}px;
              border-radius:${getSliceRadiiCssValue(asset, currentManifest?.screen)};
            "></div>
          `;
        });

        const selectedAssetIds = new Set(getSelectedSliceAssets().map((asset) => asset.id));
        const boxes = visibleAssets.map((asset, index) => {
          const placement = asset.placement;
          const radii = getSliceRadii(asset, currentManifest?.screen);
          const selected = selectedAssetIds.has(asset.id);
          const renderedWidth = placement.width * scaleX;
          const renderedHeight = placement.height * scaleY;
          const radiusInsets = Object.fromEntries(Object.entries(radii).map(([corner, radius]) => [
            corner,
            calculateSliceRadiusHandleInset(
              radius * Math.min(scaleX, scaleY),
              renderedWidth,
              renderedHeight
            )
          ]));
          const activeHandles = asset.id === activeSliceId && !asset.aiProcessing && !isLockedAiCompleteAsset(asset) ? `
              <span class="slice-handle" data-slice-handle="nw"></span>
              <span class="slice-handle" data-slice-handle="n"></span>
              <span class="slice-handle" data-slice-handle="ne"></span>
              <span class="slice-handle" data-slice-handle="e"></span>
              <span class="slice-handle" data-slice-handle="se"></span>
              <span class="slice-handle" data-slice-handle="s"></span>
              <span class="slice-handle" data-slice-handle="sw"></span>
              <span class="slice-handle" data-slice-handle="w"></span>
          ` : "";
          const activeRadiusHandles = asset.id === activeSliceId && !asset.aiProcessing ? `
              <span class="slice-radius-handle" data-slice-radius-handle="nw"></span>
              <span class="slice-radius-handle" data-slice-radius-handle="ne"></span>
              <span class="slice-radius-handle" data-slice-radius-handle="se"></span>
              <span class="slice-radius-handle" data-slice-radius-handle="sw"></span>
          ` : "";
          return `
            <button class="slice-box${selected ? " active" : ""}${asset.aiProcessing ? " ai-processing" : ""}" type="button" data-slice-id="${asset.id}"${asset.aiProcessing ? " disabled" : ""} style="
              left:${placement.x * scaleX}px;
              top:${placement.y * scaleY}px;
              width:${placement.width * scaleX}px;
              height:${placement.height * scaleY}px;
              border-radius:${getSliceRadiiCssValue(asset, currentManifest?.screen)};
              --slice-radius-nw-x:${radiusInsets.topLeft}px;
              --slice-radius-nw-y:${radiusInsets.topLeft}px;
              --slice-radius-ne-x:${radiusInsets.topRight}px;
              --slice-radius-ne-y:${radiusInsets.topRight}px;
              --slice-radius-se-x:${radiusInsets.bottomRight}px;
              --slice-radius-se-y:${radiusInsets.bottomRight}px;
              --slice-radius-sw-x:${radiusInsets.bottomLeft}px;
              --slice-radius-sw-y:${radiusInsets.bottomLeft}px;
            ">
              ${selected ? `<span class="slice-label" data-slice-settings="${asset.id}" title="Open slice settings">${index + 1}. ${escapeHtml(asset.name)}</span>` : ""}
              ${activeHandles}
              ${activeRadiusHandles}
            </button>
          `;
        });

        if (sliceDraft) {
          const draft = normalizeDraftRect(sliceDraft, currentManifest.screen);
          boxes.push(`
            <div class="slice-draft" style="
              left:${draft.x * scaleX}px;
              top:${draft.y * scaleY}px;
              width:${draft.width * scaleX}px;
              height:${draft.height * scaleY}px;
            "></div>
          `);
        }

        const overlapPreviews = aiCompletePreview?.sliceId === activeSliceId
          ? aiCompletePreview.regions.map((region) => `
            <div class="slice-overlap-preview${aiCompletePreview?.processing ? " ai-processing" : ""}" style="
              left:${region.x * scaleX}px;
              top:${region.y * scaleY}px;
              width:${region.width * scaleX}px;
              height:${region.height * scaleY}px;
            "></div>
          `)
          : [];

        layer.innerHTML = [...cutouts, ...boxes, ...overlapPreviews].join("");
        layer.querySelectorAll("[data-slice-id]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation();
            if (event.target.closest("[data-slice-settings]")) {
              if (!isSliceSelected(button.dataset.sliceId)) selectOnlySlice(button.dataset.sliceId);
              openSliceSettingsDrawer(button.dataset.sliceId);
              renderSliceOverlay(card, layer, image);
              renderCutModules(currentManifest);
              return;
            }
            if (event.shiftKey) {
              const orderedIds = (getActiveResultImage()?.sliceManifest?.assets || []).map((asset) => asset.id);
              selectSliceRange(button.dataset.sliceId, orderedIds, event.metaKey || event.ctrlKey);
            } else if (event.metaKey || event.ctrlKey) {
              toggleSliceSelection(button.dataset.sliceId);
            } else {
              selectOnlySlice(button.dataset.sliceId);
            }
            if (sliceSettingsDrawer.classList.contains("open")) {
              sliceSettingsId = activeSliceId;
              renderSliceSettingsDrawer();
            }
            renderSliceOverlay(card, layer, image);
            renderCutModules(currentManifest);
          });
        });
      }

      function refreshSliceVisibility() {
        const card = resultGrid.querySelector(".result-card.slice-mode");
        const layer = card?.querySelector(".slice-layer");
        const image = card?.querySelector(".result-canvas img");
        if (card && layer && image) {
          renderSliceOverlay(card, layer, image);
        }
      }

      function getActiveSliceAsset(id) {
        const activeImage = getActiveResultImage();
        ensureImageSliceState(activeImage);
        return activeImage?.sliceManifest?.assets.find((asset) => asset.id === id) || null;
      }

      function getSelectedSliceAssets() {
        const assets = getActiveResultImage()?.sliceManifest?.assets || [];
        const validSelected = assets.filter((asset) => selectedSliceIds.has(asset.id));
        if (activeSliceId && !selectedSliceIds.has(activeSliceId)) {
          const activeAsset = assets.find((asset) => asset.id === activeSliceId);
          return activeAsset ? [activeAsset] : [];
        }
        if (validSelected.length > 0) return validSelected;
        const activeAsset = assets.find((asset) => asset.id === activeSliceId);
        return activeAsset ? [activeAsset] : [];
      }

      function isSliceSelected(id) {
        return getSelectedSliceAssets().some((asset) => asset.id === id);
      }

      function clearSliceSelection(shouldRender = true) {
        selectedSliceIds.clear();
        activeSliceId = null;
        sliceSelectionAnchorId = null;
        if (!shouldRender) {
          aiCompletePreview = null;
          sliceSettingsId = null;
          sliceSettingsDrawer.classList.remove("open");
          sliceSettingsDrawer.setAttribute("aria-hidden", "true");
          return;
        }
        closeSliceSettingsDrawer();
        refreshSliceVisibility();
        renderCutModules(currentManifest);
      }

      function selectOnlySlice(id) {
        selectedSliceIds.clear();
        if (id) selectedSliceIds.add(id);
        activeSliceId = id || null;
        sliceSelectionAnchorId = id || null;
      }

      function toggleSliceSelection(id) {
        const effectiveIds = getSelectedSliceAssets().map((asset) => asset.id);
        selectedSliceIds.clear();
        effectiveIds.forEach((selectedId) => selectedSliceIds.add(selectedId));
        if (selectedSliceIds.has(id)) {
          selectedSliceIds.delete(id);
        } else {
          selectedSliceIds.add(id);
        }
        activeSliceId = selectedSliceIds.has(id) ? id : [...selectedSliceIds].at(-1) || null;
        sliceSelectionAnchorId = activeSliceId;
      }

      function selectSliceRange(id, orderedIds, additive = false) {
        const selectedAssets = getSelectedSliceAssets();
        const anchorIsSelected = selectedAssets.some((asset) => asset.id === sliceSelectionAnchorId);
        const anchorId = anchorIsSelected ? sliceSelectionAnchorId : activeSliceId || id;
        const anchorIndex = orderedIds.indexOf(anchorId);
        const targetIndex = orderedIds.indexOf(id);
        if (anchorIndex < 0 || targetIndex < 0) {
          selectOnlySlice(id);
          return;
        }
        if (!additive) selectedSliceIds.clear();
        const start = Math.min(anchorIndex, targetIndex);
        const end = Math.max(anchorIndex, targetIndex);
        orderedIds.slice(start, end + 1).forEach((sliceId) => selectedSliceIds.add(sliceId));
        activeSliceId = id;
        sliceSelectionAnchorId = anchorId;
      }

      function selectAllSliceAssets() {
        const assets = getActiveResultImage()?.sliceManifest?.assets || [];
        selectedSliceIds.clear();
        assets.forEach((asset) => selectedSliceIds.add(asset.id));
        if (!activeSliceId || !selectedSliceIds.has(activeSliceId)) {
          activeSliceId = assets.at(-1)?.id || null;
        }
        sliceSelectionAnchorId = activeSliceId;
      }

      function setSliceAiProcessing(asset, label, processing) {
        if (!asset) return;
        asset.aiProcessing = processing;
        asset.aiProcessingLabel = processing ? label : "";
        refreshSliceVisibility();
        renderCutModules(currentManifest);
        if (sliceSettingsDrawer.classList.contains("open") && sliceSettingsId === asset.id) {
          renderSliceSettingsDrawer();
        }
      }

      function hasRunningSliceAiTasks() {
        return Boolean(backgroundDecompositionRequest)
          || Boolean(sliceImageEditorState?.processing)
          || (currentManifest?.resultImages || []).some((image) =>
          (image.sliceManifest?.assets || []).some((asset) => asset.aiProcessing)
        );
      }

      function beginSliceAiRequest(asset, progressId) {
        sliceAiControllers.get(asset.id)?.controller.abort();
        const controller = new AbortController();
        sliceAiControllers.set(asset.id, { controller, progressId });
        return controller;
      }

      function finishSliceAiRequest(asset, controller) {
        if (sliceAiControllers.get(asset.id)?.controller === controller) {
          sliceAiControllers.delete(asset.id);
        }
      }

      function cancelSliceAiRequest(id) {
        const request = sliceAiControllers.get(id);
        const asset = getActiveSliceAsset(id);
        if (!request || !asset?.aiProcessing) return;
        fetchBackend(`/api/progress/${encodeURIComponent(request.progressId)}/cancel`, { method: "POST" }).catch(() => {});
        request.controller.abort();
        sliceAiControllers.delete(id);
        if (aiCompletePreview?.sliceId === id) aiCompletePreview = null;
        setSliceAiProcessing(asset, "", false);
        releaseBusyIfIdle();
      }

      function startAiProgressPolling(progressId, onProgress) {
        let stopped = false;
        const poll = async () => {
          if (stopped) return;
          try {
            const response = await fetch(`${PROXY_BASE_URL}/api/progress/${encodeURIComponent(progressId)}`);
            if (response.ok) {
              const progress = await response.json();
              onProgress(progress);
              if (progress.status !== "running") stopped = true;
            }
          } catch {
            // The main AI request reports connection failures; progress polling is best-effort.
          }
        };
        const timer = setInterval(poll, 1000);
        poll();
        return () => {
          stopped = true;
          clearInterval(timer);
        };
      }

      function updateBackgroundDecompositionElapsed() {
        const seconds = Math.max(0, Math.floor((Date.now() - backgroundDecompositionStartedAt) / 1000));
        backgroundDecompositionElapsed.textContent = `Elapsed ${seconds}s`;
      }

      function setBackgroundDecompositionPlanningRunning(running) {
        backgroundDecompositionLoadingDialog.classList.toggle("open", running);
        backgroundDecompositionLoadingDialog.setAttribute("aria-hidden", String(!running));
        backgroundDecompositionLoadingCancel.disabled = false;
        backgroundDecompositionLoadingCancel.textContent = "Cancel";
        if (running) {
          backgroundDecompositionStartedAt = Date.now();
          backgroundDecompositionLoadingDescription.textContent = "Identifying regular slices, full background, and overlay elements…";
          updateBackgroundDecompositionElapsed();
          clearInterval(backgroundDecompositionTimer);
          backgroundDecompositionTimer = setInterval(updateBackgroundDecompositionElapsed, 1000);
        } else {
          clearInterval(backgroundDecompositionTimer);
          backgroundDecompositionTimer = null;
        }
        updateImageToCodeButtonState();
        syncGlobalLoadingState();
      }

      function cancelBackgroundDecompositionPlanning() {
        if (!backgroundDecompositionRequest) return;
        backgroundDecompositionLoadingCancel.disabled = true;
        backgroundDecompositionLoadingCancel.textContent = "Cancelling...";
        fetchBackend(
          `/api/progress/${encodeURIComponent(backgroundDecompositionRequest.progressId)}/cancel`,
          { method: "POST" }
        ).catch(() => {});
        backgroundDecompositionRequest.controller.abort();
      }

      async function runBackgroundDecompositionPlanning(forceRecognition = false) {
        const activeImage = getActiveResultImage();
        if (
          !currentManifest
          || !activeImage?.dataUrl
          || uiBusy
          || workspaceOperationRunning
          || editablePreviewController
          || backgroundDecompositionRequest
        ) return;
        const cachedReview = getCachedBackgroundDecomposition(
          activeImage.backgroundDecompositionCache,
          activeImage
        );
        if (!forceRecognition && cachedReview) {
          backgroundDecompositionReview = cachedReview;
          if (cachedReview.backgrounds.length === 0) {
            setStatus("Reused the previous AI slice result: no full background needs restoring.", "info");
            return;
          }
          openBackgroundDecompositionReview(activeImage.dataUrl);
          return;
        }
        if (!hasConfiguredVisionAccess()) {
          setStatus(typeof t === "function" ? t("status_no_vision_model", "Please configure a Vision model in Settings") : "Please configure a Vision model in Settings", "warning");
          return;
        }
        const progressId = createAiProgressId("decompose_background");
        const controller = new AbortController();
        backgroundDecompositionRequest = { controller, progressId, mode: "planning" };
        setBackgroundDecompositionPlanningRunning(true);
        const stopProgress = startAiProgressPolling(progressId, (progress) => {
          updateBackgroundDecompositionElapsed();
          if (progress.status === "running" && progress.message) {
            backgroundDecompositionLoadingDescription.textContent = progress.message;
          }
        });
        try {
          const response = await fetchBackend("/api/design/plan-background-decomposition", {
            method: "POST",
            headers: { "content-type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              imageDataUrl: activeImage.dataUrl,
              width: currentManifest.screen.width,
              height: currentManifest.screen.height,
              sourceImageName: currentManifest.screen.name || activeImage.id || "source-ui.png",
              progressId
            })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok) {
            // A missing route has no error body; a 404 from the model provider (e.g. a retired model) does.
            if (response.status === 404 && !result.error) {
              throw new Error("The local service is outdated. Close it and run the deploy-environment script again");
            }
            throw new Error(result.error || `AI slice analysis failed: ${response.status}`);
          }
          const detectedAssets = Array.isArray(result.assets) ? result.assets : [];
          const backgrounds = Array.isArray(result.backgrounds) ? result.backgrounds : [];
          const addedCount = await appendDetectedSliceAssets(
            activeImage,
            detectedAssets,
            progressId,
            controller.signal
          );
          backgroundDecompositionReview = createBackgroundDecompositionReview(
            { backgrounds },
            currentManifest.screen
          );
          backgroundDecompositionReview.imageId = activeImage.id;
          persistBackgroundDecompositionReview();
          if (backgrounds.length === 0) {
            if (addedCount > 0) {
              setStatus(`Added ${addedCount} regular slices; no full background needs restoring.`, "success");
            } else {
              setStatus("No regular slices or restorable full backgrounds were detected.", "warning");
            }
            return;
          }
          openBackgroundDecompositionReview(activeImage.dataUrl);
        } catch (error) {
          if (error?.name !== "AbortError") {
            setStatus(error.message || String(error), "error");
          }
        } finally {
          stopProgress();
          if (backgroundDecompositionRequest?.controller === controller) {
            backgroundDecompositionRequest = null;
          }
          setBackgroundDecompositionPlanningRunning(false);
        }
      }

      function openBackgroundDecompositionReview(imageDataUrl) {
        backgroundDecompositionUndoStack.length = 0;
        backgroundDecompositionRedoStack.length = 0;
        backgroundDecompositionImage.src = imageDataUrl;
        backgroundDecompositionDialog.classList.add("open");
        backgroundDecompositionDialog.setAttribute("aria-hidden", "false");
        renderBackgroundDecompositionReview();
        initializeBackgroundDecompositionViewport();
      }

      function closeBackgroundDecompositionReview() {
        if (backgroundDecompositionRequest?.mode === "generation") return;
        backgroundDecompositionDialog.classList.remove("open");
        backgroundDecompositionDialog.setAttribute("aria-hidden", "true");
        backgroundDecompositionDrag = null;
      }

      function persistBackgroundDecompositionReview() {
        const activeImage = getActiveResultImage();
        if (!activeImage || !backgroundDecompositionReview || activeImage.id !== backgroundDecompositionReview.imageId) {
          return;
        }
        const cache = createBackgroundDecompositionCache(backgroundDecompositionReview, activeImage);
        if (!cache) return;
        activeImage.backgroundDecompositionCache = cache;
        scheduleWorkspaceDraftSave();
      }

      function cloneBackgroundDecompositionReview(review) {
        return review ? JSON.parse(JSON.stringify(review)) : null;
      }

      function recordBackgroundDecompositionHistory(review = backgroundDecompositionReview) {
        const snapshot = cloneBackgroundDecompositionReview(review);
        if (!snapshot) return;
        backgroundDecompositionUndoStack.push(snapshot);
        if (backgroundDecompositionUndoStack.length > 100) backgroundDecompositionUndoStack.shift();
        backgroundDecompositionRedoStack.length = 0;
      }

      function restoreBackgroundDecompositionHistory(review) {
        if (!review) return;
        backgroundDecompositionReview = cloneBackgroundDecompositionReview(review);
        persistBackgroundDecompositionReview();
        renderBackgroundDecompositionReview();
      }

      function undoBackgroundDecompositionChange() {
        const previous = backgroundDecompositionUndoStack.pop();
        if (!previous || !backgroundDecompositionReview) return;
        backgroundDecompositionRedoStack.push(cloneBackgroundDecompositionReview(backgroundDecompositionReview));
        restoreBackgroundDecompositionHistory(previous);
      }

      function redoBackgroundDecompositionChange() {
        const next = backgroundDecompositionRedoStack.pop();
        if (!next || !backgroundDecompositionReview) return;
        backgroundDecompositionUndoStack.push(cloneBackgroundDecompositionReview(backgroundDecompositionReview));
        restoreBackgroundDecompositionHistory(next);
      }

      function handleBackgroundDecompositionKeydown(event) {
        if (!backgroundDecompositionReview || backgroundDecompositionRequest?.mode === "generation") return;
        const isEditingText = Boolean(event.target.closest("input, textarea, select, [contenteditable='true']"));
        const modifierPressed = event.metaKey || event.ctrlKey;
        const key = event.key.toLowerCase();
        if (modifierPressed && !event.altKey && key === "z" && !isEditingText) {
          event.preventDefault();
          if (event.shiftKey) redoBackgroundDecompositionChange();
          else undoBackgroundDecompositionChange();
          return;
        }
        if (isEditingText) return;
        const background = backgroundDecompositionReview.backgrounds.find(
          (entry) => entry.id === backgroundDecompositionReview.activeBackgroundId
        );
        const overlay = background?.overlays.find(
          (entry) => entry.id === backgroundDecompositionReview.activeOverlayId && entry.remove
        );
        if (!background || !overlay) return;
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
          event.preventDefault();
          const step = event.shiftKey ? 10 : 1;
          const deltaX = event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
          const deltaY = event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
          const updated = moveDecompositionOverlay(
            backgroundDecompositionReview,
            background.id,
            overlay.id,
            { bbox: overlay.bbox, dx: deltaX, dy: deltaY }
          );
          const nextOverlay = updated.backgrounds.find((entry) => entry.id === background.id)
            ?.overlays.find((entry) => entry.id === overlay.id);
          if (
            !nextOverlay
            || nextOverlay.bbox.x === overlay.bbox.x && nextOverlay.bbox.y === overlay.bbox.y
          ) return;
          if (!event.repeat) recordBackgroundDecompositionHistory();
          backgroundDecompositionReview = updated;
          persistBackgroundDecompositionReview();
          renderBackgroundDecompositionReview();
          return;
        }
        if (event.key !== "Delete" && event.key !== "Backspace") return;
        event.preventDefault();
        recordBackgroundDecompositionHistory();
        backgroundDecompositionReview = toggleDecompositionOverlay(
          backgroundDecompositionReview,
          background.id,
          overlay.id
        );
        persistBackgroundDecompositionReview();
        renderBackgroundDecompositionReview();
      }

      function initializeBackgroundDecompositionViewport() {
        if (!backgroundDecompositionCanvasViewport) {
          backgroundDecompositionViewport.tabIndex = 0;
          backgroundDecompositionCanvasViewport = createCanvasViewportController({
            viewport: backgroundDecompositionViewport,
            controls: backgroundDecompositionZoomControls,
            fitPadding: 22,
            getSourceSize: () => backgroundDecompositionReview?.screen || { width: 0, height: 0 },
            render: ({ contentWidth, contentHeight, left, top }) => {
              backgroundDecompositionSizer.style.width = `${Math.max(contentWidth, backgroundDecompositionViewport.clientWidth)}px`;
              backgroundDecompositionSizer.style.height = `${Math.max(contentHeight, backgroundDecompositionViewport.clientHeight)}px`;
              backgroundDecompositionStage.style.width = `${Math.max(1, contentWidth)}px`;
              backgroundDecompositionStage.style.height = `${Math.max(1, contentHeight)}px`;
              backgroundDecompositionStage.style.left = `${left}px`;
              backgroundDecompositionStage.style.top = `${top}px`;
            }
          });
        }
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (backgroundDecompositionDialog.classList.contains("open")) {
              backgroundDecompositionCanvasViewport?.fit();
            }
          });
        });
      }

      function cancelBackgroundDecompositionGeneration() {
        if (backgroundDecompositionRequest?.mode !== "generation") {
          closeBackgroundDecompositionReview();
          return;
        }
        backgroundDecompositionCancel.disabled = true;
        backgroundDecompositionCancel.textContent = "Cancelling...";
        fetchBackend(
          `/api/progress/${encodeURIComponent(backgroundDecompositionRequest.progressId)}/cancel`,
          { method: "POST" }
        ).catch(() => {});
        backgroundDecompositionRequest.controller.abort();
      }

      function toDecompositionPercent(value, total) {
        return `${(Number(value) / Math.max(1, Number(total))) * 100}%`;
      }

      const decompositionCornerByHandle = {
        nw: "topLeft",
        ne: "topRight",
        se: "bottomRight",
        sw: "bottomLeft"
      };

      function getDecompositionLabelAlignmentClass(bbox, screenWidth) {
        return Number(bbox?.x) + Number(bbox?.width) / 2 > Number(screenWidth) / 2
          ? " align-right"
          : "";
      }

      function renderBackgroundDecompositionStage() {
        if (!backgroundDecompositionReview) {
          backgroundDecompositionLayer.innerHTML = "";
          return;
        }
        const { width, height } = backgroundDecompositionReview.screen;
        const background = backgroundDecompositionReview.backgrounds.find(
          (entry) => entry.id === backgroundDecompositionReview.activeBackgroundId
        );
        if (!background) {
          backgroundDecompositionLayer.innerHTML = "";
          return;
        }
        const boxStyle = (bbox) => [
          `left:${toDecompositionPercent(bbox.x, width)}`,
          `top:${toDecompositionPercent(bbox.y, height)}`,
          `width:${toDecompositionPercent(bbox.width, width)}`,
          `height:${toDecompositionPercent(bbox.height, height)}`
        ].join(";");
        const resizeHandles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"]
          .map((handle) => `<span class="background-decomposition-handle" data-handle="${handle}"></span>`)
          .join("");
        const radii = background.radii || {
          topLeft: background.radius,
          topRight: background.radius,
          bottomRight: background.radius,
          bottomLeft: background.radius
        };
        const radiusValues = ["topLeft", "topRight", "bottomRight", "bottomLeft"]
          .map((corner) => Math.max(0, Number(radii[corner]) || 0));
        const radiusXValues = radiusValues.map((radius) => radius * 100 / Math.max(1, background.bbox.width));
        const radiusYValues = radiusValues.map((radius) => radius * 100 / Math.max(1, background.bbox.height));
        const radiusStyle = [
          `border-radius:${radiusXValues.join("% ")}% / ${radiusYValues.join("% ")}%`,
          `--decomposition-radius-nw-x:clamp(8px, ${radiusXValues[0]}%, calc(50% - 2px))`,
          `--decomposition-radius-nw-y:clamp(8px, ${radiusYValues[0]}%, calc(50% - 2px))`,
          `--decomposition-radius-ne-x:clamp(8px, ${radiusXValues[1]}%, calc(50% - 2px))`,
          `--decomposition-radius-ne-y:clamp(8px, ${radiusYValues[1]}%, calc(50% - 2px))`,
          `--decomposition-radius-se-x:clamp(8px, ${radiusXValues[2]}%, calc(50% - 2px))`,
          `--decomposition-radius-se-y:clamp(8px, ${radiusYValues[2]}%, calc(50% - 2px))`,
          `--decomposition-radius-sw-x:clamp(8px, ${radiusXValues[3]}%, calc(50% - 2px))`,
          `--decomposition-radius-sw-y:clamp(8px, ${radiusYValues[3]}%, calc(50% - 2px))`
        ].join(";");
        const radiusHandles = ["nw", "ne", "se", "sw"]
          .map((handle) => `<span class="background-decomposition-radius-handle" data-decomposition-radius-handle="${handle}"></span>`)
          .join("");
        backgroundDecompositionLayer.innerHTML = `
          <div class="background-decomposition-background${background.enabled ? "" : " disabled"}" data-decomposition-background="${escapeHtml(background.id)}" style="${boxStyle(background.bbox)};${radiusStyle}">
            <span class="background-decomposition-background-label${getDecompositionLabelAlignmentClass(background.bbox, width)}" title="${escapeHtml(background.name)}">${escapeHtml(background.name)}</span>
            ${backgroundDecompositionReview.activeOverlayId ? "" : `${resizeHandles}${radiusHandles}`}
          </div>
          ${background.overlays.filter((overlay) => overlay.remove).map((overlay) => `
            <div class="background-decomposition-overlay remove${overlay.id === backgroundDecompositionReview.activeOverlayId ? " active" : ""}" data-decomposition-overlay="${escapeHtml(overlay.id)}" title="${escapeHtml(overlay.name)}" style="${boxStyle(overlay.bbox)}">
              <span class="background-decomposition-overlay-label${getDecompositionLabelAlignmentClass(overlay.bbox, width)}" title="${escapeHtml(overlay.name)}">${escapeHtml(overlay.name)}</span>
              ${overlay.id === backgroundDecompositionReview.activeOverlayId ? resizeHandles : ""}
            </div>
          `).join("")}
        `;
      }

      function renderBackgroundDecompositionReview() {
        if (!backgroundDecompositionReview) return;
        const jobs = buildBackgroundRepairJobs(backgroundDecompositionReview);
        const navigation = getBackgroundDecompositionNavigation(backgroundDecompositionReview);
        const regionCount = jobs.reduce((sum, job) => sum + job.regions.length, 0);
        if (navigation.activeBackgroundId !== backgroundDecompositionReview.activeBackgroundId) {
          backgroundDecompositionReview = {
            ...backgroundDecompositionReview,
            activeBackgroundId: navigation.activeBackgroundId,
            activeOverlayId: null
          };
        }
        const decompositionFieldLabels = {
          x: "X",
          y: "Y",
          width: "W",
          height: "H"
        };
        const decompositionCornerLabels = {
          topLeft: "Top left",
          topRight: "Top right",
          bottomRight: "Bottom right",
          bottomLeft: "Bottom left"
        };
        backgroundDecompositionList.innerHTML = `
          <div class="background-decomposition-task-navigation">
            <strong>Full background ${navigation.activeIndex + 1} / ${navigation.total}</strong>
            <div>
              <button type="button" data-decomposition-previous${navigation.previousBackgroundId ? "" : " disabled"}>Previous</button>
              <button type="button" data-decomposition-next${navigation.nextBackgroundId ? "" : " disabled"}>Next</button>
            </div>
          </div>
          ${backgroundDecompositionReview.backgrounds.map((background, index) => {
            const isActive = background.id === navigation.activeBackgroundId;
            const removalCount = background.overlays.filter((overlay) => overlay.remove).length;
            return `
              <section class="background-decomposition-candidate${isActive ? " active" : ""}${background.enabled ? "" : " disabled"}"
                data-decomposition-candidate="${escapeHtml(background.id)}">
                <div class="background-decomposition-candidate-head">
                  <input type="checkbox" data-decomposition-enabled="${escapeHtml(background.id)}"${background.enabled ? " checked" : ""} />
                  <button type="button" data-decomposition-active="${escapeHtml(background.id)}">
                    <span class="background-decomposition-candidate-index">${index + 1}</span>
                    <span class="background-decomposition-candidate-name">${escapeHtml(background.name)}</span>
                    <span class="background-decomposition-candidate-count">Remove ${removalCount} areas</span>
                  </button>
                </div>
                ${isActive ? `
                  <div class="background-decomposition-candidate-details">
                    <div class="background-decomposition-fields">
                      ${["x", "y", "width", "height"].map((field) => `
                        <label>${decompositionFieldLabels[field]}<input type="number" data-decomposition-field="${field}" data-background-id="${escapeHtml(background.id)}" value="${background.bbox[field]}" /></label>
                      `).join("")}
                      ${["topLeft", "topRight", "bottomRight", "bottomLeft"].map((corner) => `
                        <label>${decompositionCornerLabels[corner]}<input type="number" min="0" max="${Math.floor(Math.min(background.bbox.width, background.bbox.height) / 2)}" data-decomposition-corner-radius="${corner}" data-background-id="${escapeHtml(background.id)}" value="${background.radii?.[corner] ?? background.radius}" /></label>
                      `).join("")}
                    </div>
                    ${background.bakedVisuals.length ? `<p class="background-decomposition-baked">Kept: ${escapeHtml(background.bakedVisuals.join(", "))}</p>` : ""}
                    <div class="background-decomposition-overlays">
                      ${background.overlays.map((overlay) => `
                        <div class="background-decomposition-overlay-row${overlay.id === backgroundDecompositionReview.activeOverlayId ? " active" : ""}"
                          data-decomposition-overlay-row="${escapeHtml(overlay.id)}" data-background-id="${escapeHtml(background.id)}">
                          <input type="checkbox" data-decomposition-toggle-overlay="${escapeHtml(overlay.id)}" data-background-id="${escapeHtml(background.id)}"${overlay.remove ? " checked" : ""} />
                          <button type="button" data-decomposition-active-overlay="${escapeHtml(overlay.id)}" data-background-id="${escapeHtml(background.id)}" title="${escapeHtml(overlay.name)}">${escapeHtml(overlay.name)}</button>
                          <span>${overlay.kind === "code-overlay" ? "Code layer" : "Bitmap layer"}</span>
                        </div>
                      `).join("") || '<div class="background-decomposition-empty">This background has no overlays to remove</div>'}
                    </div>
                  </div>
                ` : ""}
              </section>
            `;
          }).join("")}
        `;
        backgroundDecompositionSummary.textContent = jobs.length === 0
          ? "No full background to generate"
          : `Will generate ${jobs.length} full backgrounds and remove ${regionCount} areas in total`;
        backgroundDecompositionGenerate.textContent = jobs.length === 1
          ? "Generate Full Background"
          : jobs.length > 1
            ? `Generate ${jobs.length} full backgrounds`
            : "Generate Full Background";
        backgroundDecompositionGenerate.disabled = jobs.length === 0;
        const activateBackground = (backgroundId) => {
          if (!backgroundId || backgroundId === backgroundDecompositionReview.activeBackgroundId) return;
          backgroundDecompositionReview = {
            ...backgroundDecompositionReview,
            activeBackgroundId: backgroundId,
            activeOverlayId: null
          };
          persistBackgroundDecompositionReview();
          renderBackgroundDecompositionReview();
        };
        backgroundDecompositionList.querySelectorAll("[data-decomposition-active]").forEach((button) => {
          button.addEventListener("click", () => activateBackground(button.dataset.decompositionActive));
        });
        backgroundDecompositionList.querySelector("[data-decomposition-previous]")?.addEventListener(
          "click",
          () => activateBackground(navigation.previousBackgroundId)
        );
        backgroundDecompositionList.querySelector("[data-decomposition-next]")?.addEventListener(
          "click",
          () => activateBackground(navigation.nextBackgroundId)
        );
        backgroundDecompositionList.querySelectorAll("[data-decomposition-enabled]").forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            recordBackgroundDecompositionHistory();
            backgroundDecompositionReview = toggleDecompositionBackground(
              backgroundDecompositionReview,
              checkbox.dataset.decompositionEnabled
            );
            persistBackgroundDecompositionReview();
            renderBackgroundDecompositionReview();
          });
        });
        backgroundDecompositionList.querySelectorAll("[data-decomposition-field]").forEach((input) => {
          input.addEventListener("change", () => {
            const background = backgroundDecompositionReview.backgrounds.find(
              (entry) => entry.id === input.dataset.backgroundId
            );
            if (!background) return;
            recordBackgroundDecompositionHistory();
            backgroundDecompositionReview = updateDecompositionBackground(
              backgroundDecompositionReview,
              background.id,
              { ...background.bbox, [input.dataset.decompositionField]: Number(input.value) }
            );
            persistBackgroundDecompositionReview();
            renderBackgroundDecompositionReview();
          });
        });
        backgroundDecompositionList.querySelectorAll("[data-decomposition-corner-radius]").forEach((input) => {
          input.addEventListener("change", () => {
            recordBackgroundDecompositionHistory();
            backgroundDecompositionReview = updateDecompositionBackgroundCornerRadius(
              backgroundDecompositionReview,
              input.dataset.backgroundId,
              input.dataset.decompositionCornerRadius,
              Number(input.value)
            );
            persistBackgroundDecompositionReview();
            renderBackgroundDecompositionReview();
          });
        });
        backgroundDecompositionList.querySelectorAll("[data-decomposition-toggle-overlay]").forEach((checkbox) => {
          checkbox.addEventListener("click", (event) => event.stopPropagation());
          checkbox.addEventListener("change", () => {
            recordBackgroundDecompositionHistory();
            backgroundDecompositionReview = toggleDecompositionOverlay(
              backgroundDecompositionReview,
              checkbox.dataset.backgroundId,
              checkbox.dataset.decompositionToggleOverlay
            );
            persistBackgroundDecompositionReview();
            renderBackgroundDecompositionReview();
          });
        });
        backgroundDecompositionList.querySelectorAll("[data-decomposition-overlay-row]").forEach((row) => {
          row.addEventListener("click", (event) => {
            if (event.target.closest("input")) return;
            const background = backgroundDecompositionReview.backgrounds.find(
              (entry) => entry.id === row.dataset.backgroundId
            );
            const overlay = background?.overlays.find(
              (entry) => entry.id === row.dataset.decompositionOverlayRow
            );
            if (!background || !overlay) return;
            recordBackgroundDecompositionHistory();
            const updated = toggleDecompositionOverlay(
              backgroundDecompositionReview,
              background.id,
              overlay.id
            );
            const nextOverlay = updated.backgrounds.find((entry) => entry.id === background.id)
              ?.overlays.find((entry) => entry.id === overlay.id);
            backgroundDecompositionReview = nextOverlay?.remove
              ? { ...updated, activeBackgroundId: background.id, activeOverlayId: overlay.id }
              : updated;
            persistBackgroundDecompositionReview();
            renderBackgroundDecompositionReview();
          });
        });
        renderBackgroundDecompositionStage();
      }

      function beginBackgroundDecompositionDrag(event) {
        if (!backgroundDecompositionReview || event.button !== 0) return;
        const overlay = event.target.closest("[data-decomposition-overlay]");
        if (overlay) {
          const background = backgroundDecompositionReview.backgrounds.find(
            (entry) => entry.id === backgroundDecompositionReview.activeBackgroundId
          );
          const overlayState = background?.overlays.find(
            (entry) => entry.id === overlay.dataset.decompositionOverlay
          );
          if (!overlayState?.remove) return;
          event.preventDefault();
          backgroundDecompositionReview = {
            ...backgroundDecompositionReview,
            activeOverlayId: overlayState.id
          };
          renderBackgroundDecompositionReview();
          backgroundDecompositionDrag = {
            pointerId: event.pointerId,
            targetType: "overlay",
            backgroundId: background.id,
            overlayId: overlayState.id,
            handle: event.target.dataset.handle || "move",
            startX: event.clientX,
            startY: event.clientY,
            bbox: { ...overlayState.bbox },
            review: cloneBackgroundDecompositionReview(backgroundDecompositionReview)
          };
          backgroundDecompositionLayer.setPointerCapture(event.pointerId);
          return;
        }
        const backgroundElement = event.target.closest("[data-decomposition-background]");
        if (!backgroundElement) return;
        const background = backgroundDecompositionReview.backgrounds.find(
          (entry) => entry.id === backgroundElement.dataset.decompositionBackground
        );
        if (!background) return;
        const radiusHandle = event.target.closest("[data-decomposition-radius-handle]");
        const corner = radiusHandle?.dataset.decompositionRadiusHandle || null;
        const cornerKey = decompositionCornerByHandle[corner] || null;
        event.preventDefault();
        backgroundDecompositionReview = {
          ...backgroundDecompositionReview,
          activeBackgroundId: background.id,
          activeOverlayId: null
        };
        backgroundDecompositionDrag = {
          pointerId: event.pointerId,
          targetType: "background",
          backgroundId: background.id,
          handle: radiusHandle ? "radius" : (event.target.dataset.handle || "move"),
          corner,
          cornerKey,
          startX: event.clientX,
          startY: event.clientY,
          bbox: { ...background.bbox },
          startRadius: cornerKey ? background.radii[cornerKey] : background.radius,
          startRadii: { ...background.radii },
          review: cloneBackgroundDecompositionReview(backgroundDecompositionReview)
        };
        backgroundDecompositionLayer.setPointerCapture(event.pointerId);
      }

      function moveBackgroundDecompositionDrag(event) {
        const drag = backgroundDecompositionDrag;
        if (!drag || drag.pointerId !== event.pointerId || !backgroundDecompositionReview) return;
        const rect = backgroundDecompositionLayer.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const dx = Math.round((event.clientX - drag.startX) * backgroundDecompositionReview.screen.width / rect.width);
        const dy = Math.round((event.clientY - drag.startY) * backgroundDecompositionReview.screen.height / rect.height);
        if (drag.targetType === "overlay" && drag.handle === "move") {
          backgroundDecompositionReview = moveDecompositionOverlay(
            backgroundDecompositionReview,
            drag.backgroundId,
            drag.overlayId,
            {
              bbox: drag.bbox,
              dx,
              dy
            }
          );
        } else if (drag.targetType === "overlay") {
          backgroundDecompositionReview = resizeDecompositionOverlay(
            backgroundDecompositionReview,
            drag.backgroundId,
            drag.overlayId,
            {
              handle: drag.handle,
              bbox: drag.bbox,
              dx,
              dy
            }
          );
        } else if (drag.handle === "radius") {
          const nextRadius = calculateDraggedSliceRadius(
            {
              corner: drag.corner,
              startX: 0,
              startY: 0,
              startRadius: drag.startRadius
            },
            { x: dx, y: dy },
            Math.floor(Math.min(drag.bbox.width, drag.bbox.height) / 2)
          );
          backgroundDecompositionReview = updateDecompositionBackgroundCornerRadius(
            backgroundDecompositionReview,
            drag.backgroundId,
            drag.cornerKey,
            nextRadius
          );
        } else if (drag.handle === "move") {
          backgroundDecompositionReview = moveDecompositionBackground(
            backgroundDecompositionReview,
            drag.backgroundId,
            {
              bbox: drag.bbox,
              dx,
              dy
            }
          );
        } else {
          backgroundDecompositionReview = resizeDecompositionBackground(
            backgroundDecompositionReview,
            drag.backgroundId,
            {
              handle: drag.handle,
              bbox: drag.bbox,
              dx,
              dy
            }
          );
        }
        renderBackgroundDecompositionStage();
      }

      function endBackgroundDecompositionDrag(event) {
        if (!backgroundDecompositionDrag || backgroundDecompositionDrag.pointerId !== event.pointerId) return;
        moveBackgroundDecompositionDrag(event);
        const drag = backgroundDecompositionDrag;
        backgroundDecompositionDrag = null;
        if (backgroundDecompositionLayer.hasPointerCapture(event.pointerId)) {
          backgroundDecompositionLayer.releasePointerCapture(event.pointerId);
        }
        const currentBackground = backgroundDecompositionReview?.backgrounds.find(
          (entry) => entry.id === drag.backgroundId
        );
        const currentBox = drag.targetType === "overlay"
          ? currentBackground?.overlays.find((entry) => entry.id === drag.overlayId)?.bbox
          : currentBackground?.bbox;
        const changed = drag.handle === "radius"
          ? currentBackground?.radii?.[drag.cornerKey] !== drag.startRadius
          : (
          currentBox
          && ["x", "y", "width", "height"].some((field) => currentBox[field] !== drag.bbox[field])
          );
        if (changed) {
          recordBackgroundDecompositionHistory(drag.review);
        }
        persistBackgroundDecompositionReview();
        renderBackgroundDecompositionReview();
      }

      async function generateBackgroundDecompositionAssets() {
        const review = backgroundDecompositionReview;
        const activeImage = getActiveResultImage();
        const jobs = review ? buildBackgroundRepairJobs(review) : [];
        if (!review || !activeImage || activeImage.id !== review.imageId || jobs.length === 0) {
          setStatus("The slice plan is no longer valid. Run AI Slice again.", "warning");
          return;
        }
        ensureImageSliceState(activeImage);
        backgroundDecompositionDialog.classList.add("generating");
        backgroundDecompositionGenerate.disabled = true;
        backgroundDecompositionGenerate.textContent = "Generating...";
        backgroundDecompositionCancel.disabled = false;
        backgroundDecompositionCancel.textContent = "Cancel generation";
        let completedCount = 0;
        let historyRecorded = false;
        try {
          for (const [index, job] of jobs.entries()) {
            const progressId = createAiProgressId("restore_background");
            const controller = new AbortController();
            backgroundDecompositionRequest = { controller, progressId, mode: "generation" };
            updateImageToCodeButtonState();
            backgroundDecompositionSummary.textContent = `Generating full background ${index + 1} / ${jobs.length}: ${job.name}`;
            const stopProgress = startAiProgressPolling(progressId, (progress) => {
              if (progress.status === "running" && progress.message) {
                backgroundDecompositionSummary.textContent = `${progress.message} · ${index + 1} / ${jobs.length}`;
              }
            });
            try {
              const originalDataUrl = await cropImageRegion(activeImage.dataUrl, job.bbox);
              const maskDataUrl = createAiCompleteRegionsMaskDataUrl(
                { x: 0, y: 0, width: job.bbox.width, height: job.bbox.height },
                job.regions
              );
              const blendMaskDataUrl = await createInnerFeatherMaskDataUrl(
                maskDataUrl,
                Math.round(clampNumber(Math.min(job.bbox.width, job.bbox.height) * 0.008, 3, 12, 6))
              );
              const image = await requestAiInpaint({
                fetchBackend,
                signal: controller.signal,
                sourceDataUrl: originalDataUrl,
                maskDataUrl,
                name: `${job.name || "background"}-source.png`,
                width: job.bbox.width,
                height: job.bbox.height,
                prompt: buildBackgroundRestorePrompt(job),
                completeRegions: job.regions,
                progressId
              });
              const completedDataUrl = await compositeAiInpaintResult(
                originalDataUrl,
                image.dataUrl,
                blendMaskDataUrl
              );
              if (!historyRecorded) {
                recordSliceHistory();
                historyRecorded = true;
              }
              const assetId = `background_decomposition_${Date.now().toString(36)}_${index}`;
              const backgroundName = reserveSliceAssetName(
                job.name,
                new Set(activeImage.sliceManifest.assets.map((asset) => asset.name))
              );
              const pair = createAiInpaintResultPair({
                compositeAsset: {
                id: assetId,
                name: backgroundName,
                kind: "complex-decoration",
                type: "manual_slice",
                source: "ai-background-decomposition",
                placement: { ...job.bbox },
                radius: job.radius,
                radii: { ...job.radii },
                transparent: false,
                aiTransparent: false,
                aiCompleted: true,
                aiRedrawn: false,
                selected: true,
                originalDataUrl,
                dataUrl: completedDataUrl,
                aiCompletedDataUrl: completedDataUrl,
                aiCompletedPlacement: { ...job.bbox },
                lastAiOperation: "backgroundRestore",
                transparentDataUrl: null,
                aiTransparentDataUrl: null,
                svgData: null
                },
                compositeDataUrl: completedDataUrl,
                rawFullDataUrl: image.dataUrl,
                groupId: createAiInpaintResultId("background_group"),
                rawFullId: createAiInpaintResultId(`${assetId}_raw_full`)
              });
              activeImage.sliceManifest.assets.push(
                pair.composite,
                pair.rawFull
              );
              normalizeSliceAssetNames(activeImage.sliceManifest.assets);
              selectedSliceIds.add(pair.composite.id);
              activeSliceId = pair.composite.id;
              completedCount += 1;
              refreshSliceVisibility();
              renderCutModules(currentManifest);
              scheduleWorkspaceDraftSave();
            } finally {
              stopProgress();
              if (backgroundDecompositionRequest?.controller === controller) {
                backgroundDecompositionRequest = null;
              }
            }
          }
          backgroundDecompositionDialog.classList.remove("open");
          backgroundDecompositionDialog.setAttribute("aria-hidden", "true");
          setStatus(`Generated ${completedCount} full background slices.`, "success");
        } catch (error) {
          if (error?.name !== "AbortError") {
            setStatus(`AI slice failed: ${error.message || String(error)}`, "error");
          } else if (completedCount > 0) {
            setStatus(`Cancelled; kept the ${completedCount} completed full backgrounds.`, "warning");
          }
        } finally {
          backgroundDecompositionRequest = null;
          backgroundDecompositionDialog.classList.remove("generating");
          backgroundDecompositionGenerate.textContent = "Generate Full Background";
          backgroundDecompositionCancel.disabled = false;
          backgroundDecompositionCancel.textContent = "Cancel";
          updateImageToCodeButtonState();
          if (backgroundDecompositionReview) renderBackgroundDecompositionReview();
        }
      }

      function updateSliceAiProgress(asset, progress, fallbackMessage = "Requesting AI to process the slice") {
        if (!asset?.aiProcessing) return;
        const message = progress?.message && !/AI processing complete/.test(progress.message)
          ? progress.message
          : fallbackMessage;
        asset.aiProcessingLabel = `${message} · ${progress.elapsedSeconds}s`;
        asset.aiProgressLogs = [];
        const item = cutGrid.querySelector(`[data-slice-id="${asset.id}"]`);
        const loading = item?.querySelector(".cut-ai-loading-label");
        if (loading) {
          loading.textContent = asset.aiProcessingLabel;
        }
        const settingsButton = sliceSettingsBody.querySelector(`[data-preview-ai-complete="${asset.id}"]`);
        if (settingsButton) settingsButton.textContent = asset.aiProcessingLabel;
      }

      function getSliceOverlapRegions(id) {
        const activeImage = getActiveResultImage();
        ensureImageSliceState(activeImage);
        const assets = activeImage?.sliceManifest?.assets || [];
        const target = assets.find((asset) => asset.id === id);
        if (!target) return [];
        const a = target.placement;
        return assets.flatMap((asset) => {
          if (asset.id === id || asset.hidden) return [];
          const b = asset.placement;
          const x = Math.max(a.x, b.x);
          const y = Math.max(a.y, b.y);
          const right = Math.min(a.x + a.width, b.x + b.width);
          const bottom = Math.min(a.y + a.height, b.y + b.height);
          return right > x && bottom > y ? [{ x, y, width: right - x, height: bottom - y }] : [];
        });
      }

      async function prepareDetectedSliceAsset(activeImage, detected, index, batchId, signal) {
        if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
        const placement = normalizeSlicePlacement(detected.bbox, currentManifest?.screen);
        const dataUrl = await cropImageRegion(activeImage.dataUrl, placement);
        if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
        return {
          id: `slice_ai_${batchId}_${index}`,
          name: String(detected.name || `slice_${String(index).padStart(2, "0")}`),
          kind: detected.kind,
          type: "manual_slice",
          source: "ai-bbox",
          aiBatchId: batchId,
          confidence: detected.confidence,
          containsEmbeddedText: detected.containsEmbeddedText === true,
          placement,
          radius: 0,
          transparent: false,
          aiTransparent: false,
          aiCompleted: false,
          aiRedrawn: false,
          selected: true,
          originalDataUrl: dataUrl,
          dataUrl,
          transparentDataUrl: null,
          aiTransparentDataUrl: null,
          svgData: null
        };
      }

      async function updateSelectedSliceGeometry(field, rawValue, shouldCommit) {
        if (String(rawValue).trim() === "") return;
        const selectedAssets = getSelectedSliceAssets();
        const primaryId = activeSliceId;
        for (const asset of selectedAssets) {
          await updateSliceAssetGeometry(asset.id, field, rawValue, shouldCommit);
        }
        activeSliceId = primaryId && selectedSliceIds.has(primaryId) ? primaryId : selectedAssets.at(-1)?.id || null;
        if (shouldCommit && sliceSettingsDrawer.classList.contains("open")) {
          renderSliceSettingsDrawer();
        }
      }

      function updateSelectedSliceCornerRadius(corner, rawValue, shouldCommit) {
        if (String(rawValue).trim() === "") return;
        const value = Math.round(Number(rawValue));
        if (!Number.isFinite(value)) return;
        const selectedAssets = getSelectedSliceAssets();
        selectedAssets.forEach((asset) => {
          if (!asset.aiProcessing) {
            setSliceCornerRadius(asset, corner, value, currentManifest?.screen);
          }
        });
        const card = resultGrid.querySelector(".result-card");
        renderSliceOverlay(
          card,
          card?.querySelector(".slice-layer"),
          card?.querySelector(".result-canvas img")
        );
        if (shouldCommit) {
          scheduleWorkspaceDraftSave();
          refreshSliceVisibility();
          renderCutModules(currentManifest);
          if (sliceSettingsDrawer.classList.contains("open")) renderSliceSettingsDrawer();
        }
      }

      async function updateSliceAssetGeometry(id, field, rawValue, shouldCommit) {
        const asset = getActiveSliceAsset(id);
        if (!asset || asset.aiProcessing || (isLockedAiCompleteAsset(asset) && ["x", "y", "width", "height"].includes(field))) {
          return;
        }
        const value = Math.round(Number(rawValue));
        if (!Number.isFinite(value)) {
          return;
        }
        const changesCrop = ["x", "y", "width", "height"].includes(field);
        if (changesCrop) {
          const nextPlacement = normalizeSlicePlacement({
            ...asset.placement,
            [field]: value
          }, currentManifest?.screen);
          if (
            hasSlicePlacementChanged(asset.placement, nextPlacement)
            && hasProcessedSliceResult(asset)
            && !asset.processedResetConfirmed
          ) {
            if (!confirmProcessedSliceReset(asset)) {
              renderSliceSettingsDrawer();
              return;
            }
            selectOnlySlice(id);
            asset.processedResetConfirmed = true;
            asset.isAiProcessedVariant = false;
          }
        }
        if (field === "radius") {
          const radius = Math.round(clampNumber(value, 0, getSliceFieldMax(asset, "radius", currentManifest?.screen), 0));
          asset.radius = radius;
          asset.radii = {
            topLeft: radius,
            topRight: radius,
            bottomRight: radius,
            bottomLeft: radius
          };
        } else if (["x", "y", "width", "height"].includes(field)) {
          asset.placement = normalizeSlicePlacement({
            ...asset.placement,
            [field]: value
          }, currentManifest?.screen);
          asset.radii = getSliceRadii(asset, currentManifest?.screen);
          asset.radius = Math.max(...Object.values(asset.radii));
        }
        activeSliceId = id;
        const card = resultGrid.querySelector(".result-card");
        const layer = card?.querySelector(".slice-layer");
        const image = card?.querySelector(".result-canvas img");
        renderSliceOverlay(card, layer, image);
        if (!shouldCommit) {
          return;
        }
        try {
          if (field !== "radius") {
            await updateSliceAssetCrop(id);
          } else {
            scheduleWorkspaceDraftSave();
          }
          refreshSliceVisibility();
          renderCutModules(currentManifest);
        } catch (error) {
          renderCutModules(currentManifest);
          if (sliceSettingsId === id) {
            renderSliceSettingsDrawer();
          }
          setStatus(`Failed to update slice: ${error.message || String(error)}`, "error");
        }
      }

      function getOrCreateAiCompleteEditableCopy(activeImage, sourceAsset) {
        ensureImageSliceState(activeImage);
        const assets = activeImage?.sliceManifest?.assets || [];
        const existing = assets.find((asset) => asset.aiCompleteSourceAssetId === sourceAsset.id);
        if (existing) return existing;
        const sourceName = String(sourceAsset.name || "slice")
          .replace(/_(?:ai_original|local_composite)$/, "");
        const name = reserveSliceAssetName(
          `${sourceName}_original_copy`,
          new Set(assets.map((asset) => asset.name))
        );
        const copy = createAiCompleteEditableCopy({
          sourceAsset,
          id: `${sourceAsset.id}_editable_${Date.now().toString(36)}`,
          name,
        });
        const sourceIndex = assets.findIndex((asset) => asset.id === sourceAsset.id);
        assets.splice(sourceIndex < 0 ? assets.length : sourceIndex + 1, 0, copy);
        scheduleWorkspaceDraftSave();
        return copy;
      }

      function createAiInpaintResultId(prefix = "ai_inpaint") {
        return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      }

      function installAiInpaintResultPair({
        assets,
        sourceAsset,
        compositeDataUrl,
        rawFullDataUrl
      }) {
        if (
          !Array.isArray(assets)
          || !sourceAsset
          || !compositeDataUrl
          || !rawFullDataUrl
        ) {
          throw new Error("AI inpainting candidate data is incomplete");
        }
        const existingGroupId = sourceAsset.aiInpaintResultGroupId;
        const groupId = existingGroupId || createAiInpaintResultId("ai_inpaint_group");
        const pair = createAiInpaintResultPair({
          compositeAsset: sourceAsset,
          compositeDataUrl,
          rawFullDataUrl,
          groupId,
          rawFullId: createAiInpaintResultId(`${sourceAsset.id}_raw_full`)
        });
        if (existingGroupId) {
          for (let index = assets.length - 1; index >= 0; index -= 1) {
            const candidate = assets[index];
            if (candidate !== sourceAsset && candidate.aiInpaintResultGroupId === existingGroupId) {
              assets.splice(index, 1);
            }
          }
        }
        Object.assign(sourceAsset, pair.composite);
        const sourceIndex = assets.indexOf(sourceAsset);
        assets.splice(
          sourceIndex < 0 ? assets.length : sourceIndex + 1,
          0,
          pair.rawFull
        );
        normalizeSliceAssetNames(assets);
        return {
          composite: sourceAsset,
          rawFull: pair.rawFull
        };
      }

      function confirmProcessedSliceReset(asset) {
        return window.confirm(getProcessedSliceResetMessage(asset));
      }

      async function appendDetectedSliceAssets(activeImage, detectedAssets, batchId, signal) {
        const assets = Array.isArray(detectedAssets) ? detectedAssets : [];
        if (assets.length === 0) {
          return 0;
        }
        const startIndex = activeImage.sliceManifest?.assets?.length || 0;
        ensureImageSliceState(activeImage);
        const usedNames = new Set(activeImage.sliceManifest.assets.map((asset) => asset.name));
        const preparedAssets = [];
        recordSliceHistory({
          actionType: "ai-bbox-batch",
          batchId,
          addedCount: assets.length
        });
        for (const [offset, detected] of assets.entries()) {
          const index = startIndex + offset + 1;
          const name = detected?.name ? `: ${detected.name}` : "";
          backgroundDecompositionLoadingDescription.textContent = `Adding regular slice ${offset + 1} / ${assets.length}${name}`;
          await new Promise((resolve) => requestAnimationFrame(() => resolve()));
          const prepared = await prepareDetectedSliceAsset(activeImage, {
            ...detected,
            name: reserveSliceAssetName(detected?.name, usedNames)
          }, index, batchId, signal);
          preparedAssets.push(prepared);
          activeImage.sliceManifest.assets.push(prepared);
          activeSliceId = prepared.id;
          const card = resultGrid.querySelector(".result-card.slice-mode");
          const layer = card?.querySelector(".slice-layer");
          const image = card?.querySelector(".result-canvas img");
          if (card && layer && image) renderSliceOverlay(card, layer, image);
        }
        if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
        activeSliceId = preparedAssets.at(-1)?.id || activeSliceId;
        refreshSliceVisibility();
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
        return preparedAssets.length;
      }

      async function addSliceAsset(placement) {
        const activeImage = getActiveResultImage();
        if (!activeImage) {
          return;
        }
        ensureImageSliceState(activeImage);
        const previewImage = resultGrid.querySelector(".result-card.slice-mode .result-canvas img");
        const sourceDataUrl = repairPreviewActive && previewImage?.src
          ? previewImage.src
          : activeImage.dataUrl;
        const index = activeImage.sliceManifest.assets.length + 1;
        const id = `slice_${activeResultIndex + 1}_${Date.now().toString(36)}_${index}`;
        const name = reserveSliceAssetName(
          "",
          new Set(activeImage.sliceManifest.assets.map((asset) => asset.name))
        );
        const normalizedPlacement = normalizeSlicePlacement(placement, currentManifest?.screen);
        const dataUrl = await cropImageRegion(sourceDataUrl, normalizedPlacement);
        const repair = await createSliceRepairPatch(sourceDataUrl, normalizedPlacement);
        recordSliceHistory();
        const asset = {
          id,
          name,
          type: "manual_slice",
          placement: normalizedPlacement,
          radius: 0,
          transparent: false,
          aiTransparent: false,
          aiCompleted: false,
          aiRedrawn: false,
          selected: true,
          originalDataUrl: dataUrl,
          dataUrl,
          transparentDataUrl: null,
          aiTransparentDataUrl: null,
          svgData: null,
          ...repair
        };
        activeImage.sliceManifest.assets.push(asset);
        activeSliceId = id;
        if (repairPreviewActive) {
          const repairedPreview = await createRepairedPreviewImage(activeImage);
          const previewImage = resultGrid.querySelector(".result-card.slice-mode .result-canvas img");
          if (previewImage) previewImage.src = repairedPreview;
        }
        const card = resultGrid.querySelector(".result-card.slice-mode");
        const layer = card?.querySelector(".slice-layer");
        const image = card?.querySelector(".result-canvas img");
        if (card && layer && image) renderSliceOverlay(card, layer, image);
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
      }

      async function updateSliceAssetCrop(id) {
        const activeImage = getActiveResultImage();
        const asset = getActiveSliceAsset(id);
        if (!activeImage || !asset || asset.aiProcessing) {
          return;
        }
        if (asset.isAiProcessedVariant || isLockedAiCompleteAsset(asset)) {
          return;
        }
        const version = (sliceCropVersions.get(id) || 0) + 1;
        sliceCropVersions.set(id, version);
        const placement = { ...asset.placement };
        const dataUrl = await cropImageRegion(activeImage.dataUrl, placement);
        const repair = await createSliceRepairPatch(activeImage.dataUrl, placement);
        if (
          sliceCropVersions.get(id) !== version
          || getActiveSliceAsset(id) !== asset
          || ["x", "y", "width", "height"].some((field) => asset.placement[field] !== placement[field])
        ) {
          return;
        }
        preserveAiProcessedSliceVariant(activeImage, asset);
        asset.dataUrl = dataUrl;
        Object.assign(asset, repair);
        asset.originalDataUrl = asset.dataUrl;
        asset.transparentDataUrl = null;
        asset.aiTransparentDataUrl = null;
        asset.aiTransparentPlacement = null;
        asset.aiCompletedDataUrl = null;
        asset.aiCompletedPlacement = null;
        asset.aiRedrawnPlacement = null;
        asset.lastAiOperation = null;
        asset.transparent = false;
        asset.aiTransparent = false;
        asset.aiCompleted = false;
        asset.aiRedrawn = false;
        asset.svgData = null;
        asset.auditFailed = false;
        asset.auditFailureReason = "";
        delete asset.transparencyRestoreState;
        delete asset.transparencyRestoreDataUrl;
        delete asset.svgRestoreState;
        delete asset.processedResetConfirmed;
        asset.radii = getSliceRadii(asset, currentManifest?.screen);
        asset.radius = Math.max(...Object.values(asset.radii));
        scheduleWorkspaceDraftSave();
      }

      function preserveAiProcessedSliceVariant(activeImage, asset) {
        if (asset.isAiProcessedVariant) return;
        let suffix = "";
        let processedDataUrl = asset.dataUrl;
        let processedPlacement = null;
        const operation = asset.lastAiOperation
          || (asset.aiRedrawn && asset.svgData ? "redrawSvg" : "")
          || (asset.aiTransparent && asset.aiTransparentDataUrl ? "transparent" : "");
        if (operation === "transparent" && asset.aiTransparentDataUrl) {
          suffix = "ai_transparent";
          processedDataUrl = asset.aiTransparentDataUrl;
          processedPlacement = asset.aiTransparentPlacement;
        } else if (operation === "redrawSvg" && asset.svgData) {
          suffix = "ai_redraw_svg";
          processedPlacement = asset.aiRedrawnPlacement;
        }
        if (!suffix) return;
        const placement = normalizeSlicePlacement(processedPlacement || asset.placement, currentManifest?.screen);
        const repeatedSuffix = new RegExp(`(?:_${suffix})+$`);
        const baseName = String(asset.name || "slice").replace(repeatedSuffix, "");
        const processedName = reserveSliceAssetName(
          `${baseName}_${suffix}`,
          new Set(activeImage.sliceManifest.assets.map((entry) => entry.name))
        );
        const processedAsset = {
          ...asset,
          id: `${asset.id}_processed_${Date.now().toString(36)}`,
          name: processedName,
          placement: { ...placement },
          selected: false,
          aiCompleteSourceAssetId: null,
          isAiProcessedVariant: true,
          processedResetConfirmed: false,
          aiProcessing: false,
          aiProcessingLabel: "",
          originalDataUrl: processedDataUrl,
          dataUrl: processedDataUrl
        };
        delete processedAsset.transparencyRestoreState;
        delete processedAsset.transparencyRestoreDataUrl;
        delete processedAsset.svgRestoreState;
        const sourceIndex = activeImage.sliceManifest.assets.findIndex((entry) => entry.id === asset.id);
        activeImage.sliceManifest.assets.splice(Math.max(0, sourceIndex), 0, processedAsset);
      }

      async function makeSliceTransparent(id) {
        const asset = getActiveSliceAsset(id);
        if (!asset) {
          return;
        }
        setBusy(true, `Making slice transparent locally: ${asset.name}`);
        try {
          const restoreState = createSliceTransparencyRestoreState(asset);
          const sourceDataUrl = restoreState.dataUrl;
          const transparentDataUrl = await removeEdgeBackground(sourceDataUrl);
          recordSliceHistory();
          applySliceTransparencyResult(asset, {
            dataUrl: transparentDataUrl,
            ai: false
          });
          activeSliceId = id;
          refreshSliceVisibility();
          renderCutModules(currentManifest);
          scheduleWorkspaceDraftSave();
        } catch (error) {
          setStatus(`Transparency failed: ${error.message || String(error)}`, "error");
        } finally {
          releaseBusyIfIdle();
        }
      }

      function restoreSliceTransparency(asset) {
        const restoreDataUrl = getSliceTransparencyRestoreDataUrl(asset);
        if (!restoreDataUrl) {
          return;
        }
        recordSliceHistory();
        restoreSliceTransparencyState(asset);
        activeSliceId = asset.id;
        refreshSliceVisibility();
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
      }

      async function makeAllSlicesTransparent() {
        const activeImage = getActiveResultImage();
        ensureImageSliceState(activeImage);
        const assets = activeImage?.sliceManifest?.assets || [];
        const pendingAssets = assets.filter((asset) => !asset.transparent);
        if (pendingAssets.length === 0) {
          renderCutModules(currentManifest);
          return;
        }

        setBusy(true, `Making ${pendingAssets.length} slices transparent locally…`);
        transparentAllButton.disabled = true;
        let changed = false;
        try {
          const processedAssets = [];
          for (const asset of pendingAssets) {
            const restoreState = createSliceTransparencyRestoreState(asset);
            const sourceDataUrl = restoreState.dataUrl;
            processedAssets.push({
              asset,
              restoreState,
              sourceDataUrl,
              transparentDataUrl: await removeEdgeBackground(sourceDataUrl)
            });
          }
          recordSliceHistory();
          processedAssets.forEach(({ asset, restoreState, transparentDataUrl }) => {
            applySliceTransparencyResult(asset, {
              dataUrl: transparentDataUrl,
              ai: false
            });
          });
          changed = true;
          activeSliceId = pendingAssets[pendingAssets.length - 1].id;
          refreshSliceVisibility();
          renderCutModules(currentManifest);
        } catch (error) {
          renderCutModules(currentManifest);
          setStatus(`Batch transparency failed: ${error.message || String(error)}`, "error");
        } finally {
          if (changed) scheduleWorkspaceDraftSave();
          releaseBusyIfIdle();
        }
      }

      async function makeSliceAiTransparent(id) {
        const asset = getActiveSliceAsset(id);
        if (!asset || asset.aiProcessing) {
          return;
        }
        setBusy(true, `Requesting AI to generate a transparent PNG: ${asset.name}`, true);
        setSliceAiProcessing(asset, "Requesting AI to generate a transparent PNG · 0s", true);
        const progressId = createAiProgressId("transparent");
        const controller = beginSliceAiRequest(asset, progressId);
        const stopProgress = startAiProgressPolling(progressId, (progress) => updateSliceAiProgress(asset, progress, "Requesting AI to generate a transparent PNG"));
        try {
          const restoreState = createSliceTransparencyRestoreState(asset);
          const sourceDataUrl = restoreState.dataUrl;
          const response = await fetchBackend("/api/assets/ai-redraw", {
            method: "POST",
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              dataUrl: sourceDataUrl,
              name: asset.name,
              width: asset.placement.width,
              height: asset.placement.height,
              prompt: buildAiTransparentPrompt(asset),
              progressId,
              quality: "high"
            })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(result.error || `AI transparent request failed: ${response.status}`);
          }
          const image = result.images && result.images[0];
          if (!image?.dataUrl) {
            throw new Error("AI transparency returned no image");
          }
          const transparentDataUrl = result.requiresLocalTransparency
            ? await removeEdgeBackground(image.dataUrl)
            : image.dataUrl;
          recordSliceHistory();
          applySliceTransparencyResult(asset, {
            dataUrl: transparentDataUrl,
            ai: true
          });
          activeSliceId = id;
          refreshSliceVisibility();
          renderCutModules(currentManifest);
          scheduleWorkspaceDraftSave();
          setStatus(`Generated AI transparent PNG: ${asset.name}. The original slice is kept.`, "success");
        } catch (error) {
          if (error?.name !== "AbortError") {
            setStatus(`AI transparent PNG failed: ${error.message || String(error)}`, "error");
          }
        } finally {
          stopProgress();
          finishSliceAiRequest(asset, controller);
          if (aiCompletePreview?.sliceId === id) aiCompletePreview = null;
          setSliceAiProcessing(asset, "", false);
          releaseBusyIfIdle();
        }
      }

      async function makeSliceAiComplete(id, regions) {
        const asset = getActiveSliceAsset(id);
        if (!asset || asset.aiProcessing || !regions?.length) return;
        setSliceAiProcessing(asset, "Requesting AI background completion · 0s", true);
        const progressId = createAiProgressId("complete");
        const controller = beginSliceAiRequest(asset, progressId);
        const stopProgress = startAiProgressPolling(progressId, (progress) => updateSliceAiProgress(asset, progress, "Requesting AI background completion"));
        try {
          const sourceDataUrl = asset.dataUrl;
          const maskDataUrl = createAiCompleteRegionsMaskDataUrl(asset.placement, regions);
          const blendMaskDataUrl = await createInnerFeatherMaskDataUrl(
            maskDataUrl,
            Math.round(clampNumber(Math.min(asset.placement.width, asset.placement.height) * 0.008, 3, 12, 6))
          );
          const image = await requestAiInpaint({
            fetchBackend,
            signal: controller.signal,
            sourceDataUrl,
            maskDataUrl,
            name: asset.name,
            width: asset.placement.width,
            height: asset.placement.height,
            prompt: buildAiCompletePrompt(asset, regions),
            completeRegions: regions.map((region) => ({
              x: Math.round(region.x - asset.placement.x),
              y: Math.round(region.y - asset.placement.y),
              width: Math.round(region.width),
              height: Math.round(region.height)
            })),
            progressId
          });
          setSliceAiProcessing(asset, "Compositing the completion result locally", true);
          const completedDataUrl = await compositeAiInpaintResult(
            sourceDataUrl,
            image.dataUrl,
            blendMaskDataUrl
          );
          recordSliceHistory();
          asset.aiCompletedDataUrl = completedDataUrl;
          asset.dataUrl = completedDataUrl;
          asset.aiCompleted = true;
          asset.aiCompletedPlacement = { ...asset.placement };
          asset.lastAiOperation = "complete";
          delete asset.transparencyRestoreState;
          delete asset.transparencyRestoreDataUrl;
          delete asset.svgRestoreState;
          delete asset.aiCompleteSourceAssetId;
          asset.transparent = false;
          asset.aiTransparent = false;
          asset.aiRedrawn = false;
          asset.svgData = null;
          installAiInpaintResultPair({
            assets: getActiveResultImage().sliceManifest.assets,
            sourceAsset: asset,
            compositeDataUrl: completedDataUrl,
            rawFullDataUrl: image.dataUrl
          });
          activeSliceId = id;
          if (aiCompletePreview?.sliceId === id) aiCompletePreview = null;
          refreshSliceVisibility();
          renderCutModules(currentManifest);
          scheduleWorkspaceDraftSave();
          hideStatus();
        } catch (error) {
          if (aiCompletePreview?.sliceId === id) {
            aiCompletePreview = { ...aiCompletePreview, processing: false };
            refreshSliceVisibility();
          }
          if (error?.name !== "AbortError") {
            setStatus(`AI completion failed: ${error.message || String(error)}`, "error");
          }
        } finally {
          stopProgress();
          finishSliceAiRequest(asset, controller);
          setSliceAiProcessing(asset, "", false);
        }
      }

      async function createInnerFeatherMaskDataUrl(maskDataUrl, radius) {
        const mask = await loadImageElement(maskDataUrl);
        const width = Math.max(1, mask.naturalWidth || mask.width);
        const height = Math.max(1, mask.naturalHeight || mask.height);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Cannot create the AI completion feather mask");
        context.drawImage(mask, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const distances = new Uint16Array(width * height);
        const maxDistance = 65535;
        for (let index = 0; index < distances.length; index += 1) {
          distances[index] = imageData.data[index * 4] > 0 ? maxDistance : 0;
        }
        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width; x += 1) {
            const index = y * width + x;
            if (distances[index] === 0) continue;
            if (x > 0) distances[index] = Math.min(distances[index], distances[index - 1] + 1);
            if (y > 0) distances[index] = Math.min(distances[index], distances[index - width] + 1);
          }
        }
        for (let y = height - 1; y >= 0; y -= 1) {
          for (let x = width - 1; x >= 0; x -= 1) {
            const index = y * width + x;
            if (distances[index] === 0) continue;
            if (x + 1 < width) distances[index] = Math.min(distances[index], distances[index + 1] + 1);
            if (y + 1 < height) distances[index] = Math.min(distances[index], distances[index + width] + 1);
          }
        }
        const featherRadius = Math.max(1, Math.round(radius));
        for (let index = 0; index < distances.length; index += 1) {
          const alpha = distances[index] === 0 ? 0 : Math.min(1, distances[index] / featherRadius);
          const smoothAlpha = alpha * alpha * (3 - 2 * alpha);
          const value = Math.round(smoothAlpha * 255);
          imageData.data[index * 4] = value;
          imageData.data[index * 4 + 1] = value;
          imageData.data[index * 4 + 2] = value;
          imageData.data[index * 4 + 3] = 255;
        }
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL("image/png");
      }

      async function compositeAiInpaintResult(sourceDataUrl, completedDataUrl, maskDataUrl) {
        const [source, completed, mask] = await Promise.all([
          loadImageElement(sourceDataUrl),
          loadImageElement(completedDataUrl),
          loadImageElement(maskDataUrl)
        ]);
        const width = Math.max(1, source.naturalWidth || source.width);
        const height = Math.max(1, source.naturalHeight || source.height);
        const sourceCanvas = document.createElement("canvas");
        const completedCanvas = document.createElement("canvas");
        const maskCanvas = document.createElement("canvas");
        sourceCanvas.width = completedCanvas.width = maskCanvas.width = width;
        sourceCanvas.height = completedCanvas.height = maskCanvas.height = height;
        const sourceContext = sourceCanvas.getContext("2d");
        const completedContext = completedCanvas.getContext("2d");
        const maskContext = maskCanvas.getContext("2d");
        if (!sourceContext || !completedContext || !maskContext) throw new Error("Cannot create the AI completion composite canvas");
        sourceContext.drawImage(source, 0, 0, width, height);
        completedContext.drawImage(completed, 0, 0, width, height);
        maskContext.drawImage(mask, 0, 0, width, height);
        const sourcePixels = sourceContext.getImageData(0, 0, width, height);
        const completedPixels = completedContext.getImageData(0, 0, width, height).data;
        const maskPixels = maskContext.getImageData(0, 0, width, height).data;
        for (let index = 0; index < sourcePixels.data.length; index += 4) {
          const selectionAlpha = maskPixels[index] / 255;
          if (selectionAlpha === 0) continue;
          for (let channel = 0; channel < 4; channel += 1) {
            sourcePixels.data[index + channel] = Math.round(
              sourcePixels.data[index + channel] * (1 - selectionAlpha)
                + completedPixels[index + channel] * selectionAlpha
            );
          }
        }
        sourceContext.putImageData(sourcePixels, 0, 0);
        return sourceCanvas.toDataURL("image/png");
      }

      async function convertSliceToSvg(id) {
        const asset = getActiveSliceAsset(id);
        if (!asset) {
          return;
        }
        setBusy(true, `Converting to SVG locally: ${asset.name}`);
        try {
          const svgData = await rasterAssetToEditableSvg(asset.dataUrl, asset.placement.width, asset.placement.height);
          recordSliceHistory();
          applySliceSvgResult(asset, { svgData, ai: false });
          activeSliceId = id;
          refreshSliceVisibility();
          renderCutModules(currentManifest);
          scheduleWorkspaceDraftSave();
        } catch (error) {
          setStatus(`SVG conversion failed: ${error.message || String(error)}`, "error");
        } finally {
          setBusy(false);
        }
      }

      function restoreSliceSvg(asset) {
        if (!asset) {
          return;
        }
        recordSliceHistory();
        restoreSliceSvgState(asset);
        activeSliceId = asset.id;
        refreshSliceVisibility();
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
      }

      async function redrawSliceToSvg(id) {
        const asset = getActiveSliceAsset(id);
        if (!asset || asset.aiProcessing) {
          return;
        }
        setBusy(true, `Requesting AI to redraw SVG: ${asset.name}`, true);
        setSliceAiProcessing(asset, "Requesting AI to redraw SVG · 0s", true);
        const progressId = createAiProgressId("redraw_svg");
        const controller = beginSliceAiRequest(asset, progressId);
        const stopProgress = startAiProgressPolling(progressId, (progress) => updateSliceAiProgress(asset, progress, "Requesting AI to redraw SVG"));
        try {
          const response = await fetchBackend("/api/assets/redraw-svg", {
            method: "POST",
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              dataUrl: asset.dataUrl,
              name: asset.name,
              width: asset.placement.width,
              height: asset.placement.height,
              prompt: buildAiRedrawPrompt(asset),
              progressId
            })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(formatAiRedrawError(response.status, result.error));
          }
          if (!result.svg) {
            throw new Error("AI redraw returned no SVG");
          }
          setSliceAiProcessing(asset, "Validating the SVG result", true);
          const svgData = normalizeVectorSvg(result.svg, asset.placement.width, asset.placement.height);
          recordSliceHistory();
          applySliceSvgResult(asset, { svgData, ai: true });
          activeSliceId = id;
          refreshSliceVisibility();
          renderCutModules(currentManifest);
          scheduleWorkspaceDraftSave();
          setStatus(`Generated AI redraw SVG: ${asset.name}.`, "success");
        } catch (error) {
          if (error?.name !== "AbortError") {
            setStatus(`AI redraw SVG failed: ${error.message || String(error)}`, "error");
          }
        } finally {
          stopProgress();
          finishSliceAiRequest(asset, controller);
          setSliceAiProcessing(asset, "", false);
          releaseBusyIfIdle();
        }
      }

      function createAiCompleteRegionsMaskDataUrl(placement, regions) {
        const width = Math.max(1, Math.round(placement.width));
        const height = Math.max(1, Math.round(placement.height));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Cannot create the AI completion mask");
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);
        context.fillStyle = "#fff";
        regions.forEach((region) => {
          const x = Math.max(0, Math.round(region.x - placement.x));
          const y = Math.max(0, Math.round(region.y - placement.y));
          const regionWidth = Math.min(width - x, Math.round(region.width));
          const regionHeight = Math.min(height - y, Math.round(region.height));
          if (regionWidth <= 0 || regionHeight <= 0) return;
          context.fillRect(x, y, regionWidth, regionHeight);
        });
        return canvas.toDataURL("image/png");
      }

      async function exportSlicePackage() {
        const activeImage = getActiveResultImage();
        ensureImageSliceState(activeImage);
        const assets = activeImage?.sliceManifest?.assets || [];
        if (assets.length === 0) {
          setStatus("There are no slice assets to export yet.", "warning");
          return;
        }

        setBusy(true, `Packaging ${assets.length} slice assets…`);
        exportSlicesButton.disabled = true;
        try {
          const imageIndex = activeResultIndex + 1;
          const manifest = buildSliceExportManifest({
            manifest: currentManifest,
            activeImage,
            imageIndex,
            getSliceRadius: (asset) => getSliceRadius(asset, currentManifest?.screen),
            getSliceRadii: (asset) => getSliceRadii(asset, currentManifest?.screen)
          });
          const files = [
            {
              name: "manifest.json",
              data: textToUint8Array(JSON.stringify(manifest, null, 2))
            }
          ];

          assets.forEach((asset, index) => {
            const exportedAsset = manifest.assets[index];
            files.push({
              name: exportedAsset.filename,
              data: dataUrlToUint8Array(asset.dataUrl)
            });
            if (asset.svgData) {
              files.push({
                name: exportedAsset.svgFilename,
                data: textToUint8Array(asset.svgData)
              });
            }
          });

          const zipBlob = createZipBlob(files);
          triggerBlobDownload(zipBlob, `ai-ui-slices-image-${imageIndex}.zip`);
          setStatus(`Exported ${assets.length} slice assets and manifest.json.`, "success");
        } catch (error) {
          setStatus(`Failed to export the slice package: ${error.message || String(error)}`, "error");
        } finally {
          setBusy(false);
          renderCutModules(currentManifest);
        }
      }

      function removeSliceAsset(id) {
        const activeImage = getActiveResultImage();
        if (!activeImage?.sliceManifest?.assets) {
          return;
        }
        const target = activeImage.sliceManifest.assets.find((asset) => asset.id === id);
        if (!target || target.aiProcessing) return;
        recordSliceHistory();
        sliceCropVersions.delete(id);
        activeImage.sliceManifest.assets = activeImage.sliceManifest.assets.filter((asset) => asset.id !== id);
        selectedSliceIds.delete(id);
        if (activeSliceId === id) {
          activeSliceId = [...selectedSliceIds].at(-1) || null;
        }
        if (sliceSelectionAnchorId === id) {
          sliceSelectionAnchorId = activeSliceId;
        }
        if (sliceSettingsId === id) {
          closeSliceSettingsDrawer();
        }
        refreshSliceVisibility();
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
      }

      function removeSelectedSliceAssets(confirmRemoval = true) {
        const activeImage = getActiveResultImage();
        const selectedAssets = getSelectedSliceAssets();
        if (!activeImage?.sliceManifest?.assets || selectedAssets.length === 0) return;
        if (selectedAssets.some((asset) => asset.aiProcessing)) {
          setStatus("AI is processing; slices cannot be deleted for now.", "warning");
          return;
        }
        const message = selectedAssets.length === 1
          ? `Delete slice ${selectedAssets[0].name}?`
          : `Delete the ${selectedAssets.length} selected slices?`;
        if (confirmRemoval && !window.confirm(message)) return;
        recordSliceHistory();
        const selectedIds = new Set(selectedAssets.map((asset) => asset.id));
        selectedIds.forEach((id) => sliceCropVersions.delete(id));
        activeImage.sliceManifest.assets = activeImage.sliceManifest.assets.filter((asset) => !selectedIds.has(asset.id));
        selectedSliceIds.clear();
        activeSliceId = null;
        sliceSelectionAnchorId = null;
        closeSliceSettingsDrawer();
        refreshSliceVisibility();
        renderCutModules(currentManifest);
        scheduleWorkspaceDraftSave();
      }

      function reorderSliceAsset(sourceId, targetId, before = true) {
        if (!sourceId || !targetId || sourceId === targetId) return;
        const activeImage = getActiveResultImage();
        const assets = activeImage?.sliceManifest?.assets;
        if (!assets) return;
        const displayAssets = [...assets].reverse();
        const sourceIndex = displayAssets.findIndex((asset) => asset.id === sourceId);
        const targetIndex = displayAssets.findIndex((asset) => asset.id === targetId);
        if (sourceIndex < 0 || targetIndex < 0) return;
        if (displayAssets[sourceIndex].aiProcessing || displayAssets[targetIndex].aiProcessing) return;
        recordSliceHistory();
        const [moved] = displayAssets.splice(sourceIndex, 1);
        const targetIndexAfterMove = displayAssets.findIndex((asset) => asset.id === targetId);
        displayAssets.splice(Math.max(0, targetIndexAfterMove + (before ? 0 : 1)), 0, moved);
        assets.splice(0, assets.length, ...displayAssets.reverse());
        renderCutModules(currentManifest, true);
        scheduleWorkspaceDraftSave();
      }

      async function cropImageRegion(dataUrl, placement) {
        const source = await loadImageElement(dataUrl);
        const canvas = document.createElement("canvas");
        canvas.width = placement.width;
        canvas.height = placement.height;
        const context = canvas.getContext("2d");
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(
          source,
          placement.x,
          placement.y,
          placement.width,
          placement.height,
          0,
          0,
          placement.width,
          placement.height
        );
        return canvas.toDataURL("image/png");
      }

      async function removeEdgeBackground(dataUrl) {
        const source = await loadImageElement(dataUrl);
        const canvas = document.createElement("canvas");
        canvas.width = source.naturalWidth || source.width;
        canvas.height = source.naturalHeight || source.height;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(source, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const background = sampleEdgeColor(pixels, canvas.width, canvas.height);
        const hardThreshold = 34;
        const softThreshold = 82;

        for (let index = 0; index < pixels.length; index += 4) {
          const distance = colorDistance(
            pixels[index],
            pixels[index + 1],
            pixels[index + 2],
            background.r,
            background.g,
            background.b
          );
          if (distance <= hardThreshold) {
            pixels[index + 3] = 0;
          } else if (distance < softThreshold) {
            const alphaRatio = (distance - hardThreshold) / (softThreshold - hardThreshold);
            pixels[index + 3] = Math.round(pixels[index + 3] * alphaRatio);
          }
        }

        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL("image/png");
      }

      async function rasterAssetToEditableSvg(dataUrl, fallbackWidth, fallbackHeight) {
        const source = await loadImageElement(dataUrl);
        const sourceWidth = source.naturalWidth || source.width || fallbackWidth;
        const sourceHeight = source.naturalHeight || source.height || fallbackHeight;
        const width = Math.max(1, Math.round(fallbackWidth || sourceWidth));
        const height = Math.max(1, Math.round(fallbackHeight || sourceHeight));
        const backendSvg = await vectorizeAssetWithBackend(dataUrl, width, height);
        if (backendSvg) {
          return backendSvg;
        }

        const tracer = window.ImageTracer;
        if (!tracer || typeof tracer.imagedataToSVG !== "function") {
          throw new Error("SVG conversion engine is not loaded");
        }

        const maxSampleSize = 420;
        const scale = Math.min(1, maxSampleSize / Math.max(sourceWidth, sourceHeight));
        const sampleWidth = Math.max(1, Math.round(sourceWidth * scale));
        const sampleHeight = Math.max(1, Math.round(sourceHeight * scale));
        const canvas = document.createElement("canvas");
        canvas.width = sampleWidth;
        canvas.height = sampleHeight;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(source, 0, 0, sampleWidth, sampleHeight);
        const imageData = context.getImageData(0, 0, sampleWidth, sampleHeight);
        const traceScale = width / sampleWidth;
        const svg = tracer.imagedataToSVG(imageData, {
          ltres: 0.5,
          qtres: 0.5,
          pathomit: 8,
          rightangleenhance: false,
          colorsampling: 2,
          numberofcolors: 18,
          mincolorratio: 0.01,
          colorquantcycles: 3,
          layering: 0,
          strokewidth: 0,
          linefilter: true,
          scale: traceScale,
          roundcoords: 1,
          viewbox: false,
          desc: false,
          blurradius: 0,
          blurdelta: 20
        });

        const pathCount = (svg.match(/<path/g) || []).length;
        if (!pathCount) {
          throw new Error("No convertible SVG paths were detected");
        }
        if (pathCount > 700) {
          throw new Error("Too many paths; this asset is better kept as PNG");
        }

        return normalizeVectorSvg(svg, width, height);
      }

      async function vectorizeAssetWithBackend(dataUrl, width, height) {
        try {
          const response = await fetchBackend("/api/assets/vectorize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dataUrl, width, height })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(result.error || `VTracer conversion failed: ${response.status}`);
          }
          if (!result.svg) {
            throw new Error("VTracer returned no SVG");
          }
          return normalizeVectorSvg(result.svg, width, height);
        } catch (error) {
          console.warn("VTracer SVG conversion failed, falling back to ImageTracerJS.", error);
          return null;
        }
      }

      async function buildPlacementManifest(manifest) {
        const activeImage = getActiveResultImage();
        ensureImageSliceState(activeImage);
        const assets = await Promise.all((activeImage?.sliceManifest?.assets || []).map(async (asset) => ({
          ...asset,
          ...(!asset.svgData && asset.dataUrl ? {
            dataUrl: await ensurePngOrJpegDataUrl(asset.dataUrl)
          } : {}),
          selected: isSliceAssetIncludedForImport(asset)
        })));
        const previewDataUrl = await createRepairedPreviewImage(activeImage);
        return {
          ...manifest,
          previewImage: { dataUrl: previewDataUrl || activeImage?.dataUrl || manifest.previewImage.dataUrl },
          assets
        };
      }

      function isSliceAssetIncludedForImport(asset) {
        return asset?.selected !== false || Boolean(asset?.aiCompleteSourceAssetId);
      }

      function updateImageToCodeButtonState() {
        const disabled = importActionsDisabled
          || uiBusy
          || workspaceOperationRunning
          || Boolean(backgroundDecompositionRequest)
          || !getActiveResultImage()?.dataUrl;
        decomposeBackgroundButton.disabled = disabled;
      }

      function setImportActionsDisabled(disabled) {
        importActionsDisabled = disabled;
        placeSourceButton.disabled = disabled;
        placeAiLayersButton.disabled = disabled;
        updateImageToCodeButtonState();
      }

      function setWorkspaceOperationRunning(running) {
        workspaceOperationRunning = running;
        updateImageToCodeButtonState();
      }

      function tryStartWorkspaceOperation() {
        if (workspaceOperationRunning) return false;
        setWorkspaceOperationRunning(true);
        return true;
      }

      function canLeaveDuringAiDecomposition() {
        if (!backgroundDecompositionRequest) return true;
        setStatus("AI slice is running; wait for it to finish or cancel it first.", "warning");
        return false;
      }

      function canStartFigmaImport() {
        if (!currentManifest) return false;
        if (!canStartFigmaImportOperation({
          uiBusy,
          figmaImportPending,
          figmaFrameHtmlExportPending
        })) {
          setStatus("Another operation is in progress; wait for it to finish before importing into Figma.", "warning");
          return false;
        }
        if (hasRunningSliceAiTasks()) {
          setStatus("AI generation tasks are still running; wait for them to finish or cancel them before importing into Figma.", "warning");
          return false;
        }
        return true;
      }

      function hasConfiguredVisionAccess() {
        const configId = modelConfigState.taskRouting.vision;
        return Boolean(modelConfigState.modelConfigs.some((config) => (
          config.id === configId
          && config.tasks.includes("vision")
          && String(config.model || "").trim()
          && (config.hasApiKey || /^cli:\/\//i.test(config.baseUrl || ""))
        )));
      }

      function toggleImportHelp(button) {
        if (!importHelpPopover.hidden && importHelpPopover.dataset.owner === button.getAttribute("aria-label")) {
          closeImportHelp();
          return;
        }
        importHelpPopover.textContent = button.dataset.importHelp || "";
        importHelpPopover.dataset.owner = button.getAttribute("aria-label") || "";
        importHelpPopover.hidden = false;
        const buttonRect = button.getBoundingClientRect();
        const popoverRect = importHelpPopover.getBoundingClientRect();
        const preferRight = button.dataset.importHelpPlacement === "right";
        const rightSideLeft = buttonRect.right + 8;
        const leftSideLeft = buttonRect.left - popoverRect.width - 8;
        const left = preferRight
          ? (
            rightSideLeft + popoverRect.width <= window.innerWidth - 12
              ? rightSideLeft
              : Math.max(12, leftSideLeft)
          )
          : Math.min(window.innerWidth - popoverRect.width - 12, Math.max(12, buttonRect.right - popoverRect.width));
        const below = buttonRect.bottom + 8;
        const top = below + popoverRect.height <= window.innerHeight - 12
          ? below
          : Math.max(12, buttonRect.top - popoverRect.height - 8);
        importHelpPopover.style.left = `${left}px`;
        importHelpPopover.style.top = `${top}px`;
      }

      function closeImportHelp() {
        importHelpPopover.hidden = true;
        importHelpPopover.dataset.owner = "";
      }

      async function placeSourceInFigma() {
        if (!canStartFigmaImport()) return;
        if (!isEmbeddedPluginHost()) {
          return;
        }

        setBusy(true, "Building slice import data…");
        let placementManifest;
        try {
          placementManifest = await buildPlacementManifest(currentManifest);
          setBusy(true, "Sending slices to Figma…");
        } catch (error) {
          console.error("Failed to import the source file into Figma.", error);
          setBusy(false);
          return;
        }

        const requestId = beginFigmaImportRequest(FIGMA_SOURCE_IMPORT_IDLE_TIMEOUT_MS);
        parent.postMessage(
          {
            pluginMessage: {
              type: "create-ui-asset-screen",
              requestId,
              manifest: placementManifest
            }
          },
          "*"
        );
      }

      async function previewEditableDesignHtml(forceRecognition = false) {
        if (!currentManifest) {
          return;
        }
        if (editablePreviewController) {
          setStatus("The AI layer import preview is being generated; wait for it to finish or cancel it first.", "warning");
          return;
        }
        if (!hasConfiguredVisionAccess()) {
          setStatus(typeof t === "function" ? t("status_no_vision_model", "Please configure a Vision model in Settings") : "Please configure a Vision model in Settings", "warning");
          return;
        }
        let previewContext;
        try {
          previewContext = await buildCurrentEditablePreviewContext();
        } catch (error) {
          openEditablePreviewLoadingDialog();
          showEditablePreviewLoadingError(error.message || String(error));
          return;
        }
        const cachedPreview = getCachedHtmlPreview(htmlPreviewCache);
        const cacheReuseState = getHtmlPreviewCacheReuseState(
          cachedPreview,
          previewContext.contextSignature,
          forceRecognition
        );
        if (cacheReuseState.shouldReuse) {
          try {
            openHtmlPreview(cacheReuseState.entry, previewContext.localAssets);
            if (cacheReuseState.warning) {
              setStatus(cacheReuseState.warning, "warning");
            }
            return;
          } catch (error) {
            const recovery = getHtmlPreviewCacheOpenRecovery(error);
            if (!recovery.regenerate) {
              openEditablePreviewLoadingDialog();
              showEditablePreviewLoadingError(recovery.message);
              return;
            }
            resetHtmlPreviewCache();
            scheduleWorkspaceDraftSave();
            setStatus(recovery.message, "warning");
          }
        }
        const controller = new AbortController();
        const requestId = ++editablePreviewRequestSequence;
        const progressId = createAiProgressId("editable_preview");
        editablePreviewController = controller;
        activeEditablePreviewRequestId = requestId;
        editablePreviewProgressId = progressId;
        openEditablePreviewLoadingDialog();
        const stopProgress = startAiProgressPolling(progressId, (progress) => {
          updateEditablePreviewElapsed();
          if (progress.status === "running" && progress.message) {
            editablePreviewLoadingDescription.textContent = progress.message;
          }
        });
        let keepLoadingDialogOpen = false;
        try {
          editablePreviewLoadingDescription.textContent = "Asking the image understanding model to analyze text, layout and slice assets…";
          const result = await requestEditableDesignHtmlPreview(
            controller.signal,
            progressId,
            previewContext.localAssets
          );
          if (!isActiveHtmlPreviewRequest(requestId, {
            activeRequestId: activeEditablePreviewRequestId,
            aborted: controller.signal.aborted
          })) {
            return;
          }
          if (!result.html) {
            throw new Error("The backend returned no AI layer import preview");
          }
          editablePreviewLoadingDescription.textContent = "Preparing the AI layer import preview…";
          const cacheEntry = createHtmlPreviewCacheEntry(
            result,
            previewContext.contextSignature
          );
          if (!cacheEntry) {
            throw new Error("The backend returned an AI layer import preview that cannot be cached");
          }
          openHtmlPreview(cacheEntry, previewContext.localAssets);
          if (result.warning) {
            setStatus(result.warning, "warning");
          } else {
            const assetCount = Number(result.metadata?.referenceAssetCount || 0);
            setStatus(`Opened the AI layer import preview with ${assetCount} slice assets.`, "success");
          }
        } catch (error) {
          if (error?.name === "AbortError") {
            return;
          }
          const message = error.message || String(error);
          keepLoadingDialogOpen = true;
          showEditablePreviewLoadingError(message);
        } finally {
          stopProgress();
          if (
            editablePreviewController === controller
            && activeEditablePreviewRequestId === requestId
          ) {
            editablePreviewController = null;
            activeEditablePreviewRequestId = 0;
            editablePreviewProgressId = "";
            if (!keepLoadingDialogOpen) closeEditablePreviewLoadingDialog();
          }
        }
      }

      async function buildCurrentEditablePreviewContext() {
        const activeImage = getActiveResultImage();
        if (!activeImage?.dataUrl) {
          throw new Error("There is no current design to preview");
        }
        const localAssets = await collectEditableReferenceAssets(activeImage);
        const context = {
          sourceImageDataUrl: activeImage.dataUrl,
          width: currentManifest?.screen?.width,
          height: currentManifest?.screen?.height,
          prompt: promptInput.value.trim() || currentManifest?.sourcePrompt || "",
          visionConfigId: modelConfigState.taskRouting.vision || "",
          assets: localAssets
        };
        return {
          localAssets,
          contextSignature: createEditablePreviewContextSignature(context)
        };
      }

      async function refreshCurrentEditablePreviewAssets() {
        const context = await buildCurrentEditablePreviewContext();
        const localAssets = activeHtmlPreviewResult?.canonicalHtml
          ? selectCanonicalReferenceAssets(activeHtmlPreviewResult.canonicalHtml, context.localAssets)
          : context.localAssets;
        activeHtmlPreviewAssets = localAssets;
        return { ...context, localAssets };
      }

      function updateEditablePreviewElapsed() {
        const totalSeconds = Math.max(0, Math.floor((Date.now() - editablePreviewStartedAt) / 1000));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        editablePreviewElapsed.textContent = minutes > 0
          ? `Elapsed ${minutes}m ${String(seconds).padStart(2, "0")}s`
          : `Elapsed ${seconds}s`;
      }

      function openEditablePreviewLoadingDialog() {
        editablePreviewStartedAt = Date.now();
        editablePreviewLoadingDialog.dataset.state = "running";
        editablePreviewLoadingTitle.textContent = "Importing AI Layers";
        editablePreviewCancel.disabled = false;
        editablePreviewCancel.textContent = "Cancel";
        editablePreviewRetry.hidden = true;
        editablePreviewLoadingDescription.textContent = "Preparing to request vision model to analyze text, layout, and slice assets…";
        updateEditablePreviewElapsed();
        clearInterval(editablePreviewTimer);
        editablePreviewTimer = setInterval(updateEditablePreviewElapsed, 1000);
        editablePreviewLoadingDialog.classList.add("open");
        editablePreviewLoadingDialog.setAttribute("aria-hidden", "false");
        syncGlobalLoadingState();
      }

      function closeEditablePreviewLoadingDialog() {
        clearInterval(editablePreviewTimer);
        editablePreviewTimer = null;
        editablePreviewLoadingDialog.classList.remove("open");
        editablePreviewLoadingDialog.setAttribute("aria-hidden", "true");
        editablePreviewLoadingDialog.dataset.state = "idle";
        syncGlobalLoadingState();
      }

      function showEditablePreviewLoadingError(message) {
        clearInterval(editablePreviewTimer);
        editablePreviewTimer = null;
        editablePreviewLoadingDialog.dataset.state = "error";
        editablePreviewLoadingTitle.textContent = "AI layer import failed";
        editablePreviewLoadingDescription.textContent = message;
        editablePreviewElapsed.textContent = `Failed after ${editablePreviewElapsed.textContent.replace(/^Elapsed:?\s*/, "")}`;
        editablePreviewRetry.hidden = false;
        editablePreviewRetry.disabled = false;
        editablePreviewCancel.disabled = false;
        editablePreviewCancel.textContent = "Close";
        syncGlobalLoadingState();
      }

      function openHtmlPreview(cacheEntry, localAssets) {
        const previewAssets = selectCanonicalReferenceAssets(cacheEntry.canonicalHtml, localAssets);
        const html = sanitizeHtmlPreviewForDisplay(
          hydrateCanonicalAssetHtml(cacheEntry.canonicalHtml, previewAssets)
        );
        activeHtmlPreviewResult = cacheEntry;
        activeHtmlPreviewAssets = previewAssets;
        htmlPreviewCache = cacheEntry;
        scheduleWorkspaceDraftSave();
        htmlPreviewLoadSequence += 1;
        activeHtmlPreviewCalibrationCss = "";
        activeHtmlPreviewExportGeometries = [];
        htmlPreviewReadyPromise = Promise.resolve();
        htmlPreviewDownload.disabled = true;
        htmlPreviewImport.disabled = true;
        htmlPreviewImport.title = figExportUiMode.editableTitle;
        resetHtmlPreviewZoomView();
        resetHtmlPreviewInspector();
        htmlPreviewDialog.classList.add("open");
        htmlPreviewFrame.srcdoc = html;
      }

      function getHtmlPreviewSourceSize() {
        const width = Number(currentManifest?.screen?.width);
        const height = Number(currentManifest?.screen?.height);
        if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
          return null;
        }
        return { width, height };
      }

      function initializeHtmlPreviewZoom() {
        htmlPreviewCanvasViewport?.destroy();
        htmlPreviewStage.tabIndex = 0;
        htmlPreviewCanvasViewport = createCanvasViewportController({
          viewport: htmlPreviewStage,
          controls: htmlPreviewZoomControls,
          fitPadding: 12,
          getSourceSize: getHtmlPreviewSourceSize,
          render: ({ zoom, contentWidth, contentHeight, left, top }) => {
            const source = getHtmlPreviewSourceSize();
            if (!source) return;
            htmlPreviewFrame.style.width = `${source.width}px`;
            htmlPreviewFrame.style.height = `${source.height}px`;
            htmlPreviewFrame.style.transform = `scale(${zoom})`;
            htmlPreviewSizer.style.width = `${Math.max(contentWidth, htmlPreviewStage.clientWidth)}px`;
            htmlPreviewSizer.style.height = `${Math.max(contentHeight, htmlPreviewStage.clientHeight)}px`;
            htmlPreviewFrame.style.left = `${left}px`;
            htmlPreviewFrame.style.top = `${top}px`;
            updateHtmlPreviewInspectorHighlight();
          }
        });
        const frameWindow = htmlPreviewFrame.contentWindow;
        if (frameWindow) htmlPreviewCanvasViewport.bindWheelTarget(frameWindow);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (htmlPreviewDialog.classList.contains("open")) {
              htmlPreviewCanvasViewport?.fit();
            }
          });
        });
      }

      function resetHtmlPreviewZoomView() {
        htmlPreviewCanvasViewport?.destroy();
        htmlPreviewCanvasViewport = null;
        htmlPreviewStage.scrollLeft = 0;
        htmlPreviewStage.scrollTop = 0;
        htmlPreviewFrame.style.width = "";
        htmlPreviewFrame.style.height = "";
        htmlPreviewFrame.style.transform = "";
        htmlPreviewFrame.style.left = "";
        htmlPreviewFrame.style.top = "";
        htmlPreviewSizer.style.width = "1px";
        htmlPreviewSizer.style.height = "1px";
      }

      function bindHtmlPreviewInspectorControls() {
        htmlPreviewInspectorDelete.addEventListener("click", () => {
          void deleteSelectedHtmlPreviewInspectorElement();
        });
        window.addEventListener("keydown", handleHtmlPreviewInspectorDeleteKey);
        htmlPreviewStage.addEventListener("scroll", updateHtmlPreviewInspectorHighlight, { passive: true });
        htmlPreviewInspectorResize.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          htmlPreviewInspectorResizeDrag = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startWidth: htmlPreviewInspector.getBoundingClientRect().width
          };
          htmlPreviewBody.classList.add("inspector-resizing");
          htmlPreviewInspectorResize.setPointerCapture?.(event.pointerId);
        });
        htmlPreviewInspectorResize.addEventListener("keydown", (event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const delta = event.key === "ArrowLeft" ? 10 : -10;
          setHtmlPreviewInspectorWidth(htmlPreviewInspectorWidth + delta);
          htmlPreviewCanvasViewport?.refresh();
        });
        window.addEventListener("pointermove", (event) => {
          if (!htmlPreviewInspectorResizeDrag || event.pointerId !== htmlPreviewInspectorResizeDrag.pointerId) return;
          const width = htmlPreviewInspectorResizeDrag.startWidth
            + htmlPreviewInspectorResizeDrag.startX
            - event.clientX;
          setHtmlPreviewInspectorWidth(width);
        });
        window.addEventListener("pointerup", (event) => {
          if (!htmlPreviewInspectorResizeDrag || event.pointerId !== htmlPreviewInspectorResizeDrag.pointerId) return;
          htmlPreviewInspectorResizeDrag = null;
          htmlPreviewBody.classList.remove("inspector-resizing");
          htmlPreviewCanvasViewport?.refresh();
          updateHtmlPreviewInspectorHighlight();
        });
      }

      function setHtmlPreviewInspectorWidth(width) {
        htmlPreviewInspectorWidth = clampInspectorWidth(width);
        htmlPreviewInspector.style.width = `${htmlPreviewInspectorWidth}px`;
        htmlPreviewCanvasViewport?.refresh();
        updateHtmlPreviewInspectorHighlight();
      }

      function initializeHtmlPreviewInspector() {
        cleanupHtmlPreviewInspectorPicker?.();
        cleanupHtmlPreviewInspectorPicker = null;
        const doc = htmlPreviewFrame.contentDocument;
        htmlPreviewInspectorScreen = doc?.querySelector(".screen") || null;
        htmlPreviewInspectorSelectedElement = null;
        htmlPreviewInspectorSelectionLocked = false;
        htmlPreviewInspectorHoveredElement = null;
        updateHtmlPreviewInspectorDeleteState();
        htmlPreviewInspectorExpandedElements.clear();
        if (!htmlPreviewInspectorScreen) {
          renderHtmlPreviewInspectorEmpty(htmlPreviewInspectorTree, "The current preview has no .screen root node");
          renderHtmlPreviewInspectorDetails(null);
          return;
        }
        htmlPreviewInspectorExpandedElements.add(htmlPreviewInspectorScreen);
        renderHtmlPreviewInspectorTree();
        renderHtmlPreviewInspectorDetails(null);
        updateHtmlPreviewInspectorHighlight();

        const handlePickerClick = (event) => {
          const element = findInspectorReferenceAssetElement(event.target, htmlPreviewInspectorScreen)
            || findInspectorReferenceAssetAtPoint(htmlPreviewInspectorScreen, event.clientX, event.clientY);
          const target = element || findInspectorElement(event.target, htmlPreviewInspectorScreen);
          if (!target) return;
          event.preventDefault();
          event.stopPropagation();
          selectHtmlPreviewInspectorElement(target, "click");
        };
        const handlePreviewMouseMove = (event) => {
          const element = findInspectorReferenceAssetElement(event.target, htmlPreviewInspectorScreen)
            || findInspectorReferenceAssetAtPoint(htmlPreviewInspectorScreen, event.clientX, event.clientY);
          const target = element || findInspectorElement(event.target, htmlPreviewInspectorScreen);
          if (target) {
            selectHtmlPreviewInspectorElement(target, "hover");
          }
        };
        const handlePreviewKeyDown = (event) => {
          handleHtmlPreviewInspectorDeleteKey(event);
        };
        doc.addEventListener("click", handlePickerClick, true);
        doc.addEventListener("mousemove", handlePreviewMouseMove, true);
        doc.addEventListener("keydown", handlePreviewKeyDown, true);
        cleanupHtmlPreviewInspectorPicker = () => {
          doc.removeEventListener("click", handlePickerClick, true);
          doc.removeEventListener("mousemove", handlePreviewMouseMove, true);
          doc.removeEventListener("keydown", handlePreviewKeyDown, true);
        };
      }

      function getHtmlPreviewInspectorReferenceAssets() {
        const assets = new Map();
        for (const asset of getActiveResultImage()?.sliceManifest?.assets || []) {
          assets.set(String(asset?.id || ""), asset);
        }
        for (const asset of activeHtmlPreviewAssets) {
          const id = String(asset?.id || "");
          assets.set(id, { ...assets.get(id), ...asset });
        }
        return [...assets.values()];
      }

      function renderHtmlPreviewInspectorTree() {
        htmlPreviewInspectorTree.replaceChildren();
        const screen = htmlPreviewInspectorScreen;
        if (!screen?.isConnected) {
          renderHtmlPreviewInspectorEmpty(htmlPreviewInspectorTree, "The current preview has no elements to inspect");
          return;
        }
        appendHtmlPreviewInspectorTreeNode(screen, 0);
        requestAnimationFrame(() => {
          htmlPreviewInspectorTree.querySelector(".selected")?.scrollIntoView({ block: "nearest" });
        });
      }

      function appendHtmlPreviewInspectorTreeNode(element, depth) {
        const children = [...element.children];
        const row = document.createElement("div");
        row.className = "html-preview-inspector-tree-row";
        row.style.paddingLeft = `${6 + depth * 14}px`;
        row.classList.toggle("selected", element === htmlPreviewInspectorSelectedElement);
        row.classList.toggle(
          "selection-locked",
          htmlPreviewInspectorSelectionLocked && element === htmlPreviewInspectorSelectedElement
        );

        const disclosure = document.createElement("button");
        disclosure.className = "html-preview-inspector-disclosure";
        disclosure.type = "button";
        disclosure.disabled = !children.length;
        disclosure.textContent = children.length
          ? (htmlPreviewInspectorExpandedElements.has(element) ? "−" : "+")
          : "";
        disclosure.setAttribute("aria-label", htmlPreviewInspectorExpandedElements.has(element) ? "Collapse children" : "Expand children");
        disclosure.addEventListener("click", (event) => {
          event.stopPropagation();
          if (htmlPreviewInspectorExpandedElements.has(element)) {
            htmlPreviewInspectorExpandedElements.delete(element);
          } else {
            htmlPreviewInspectorExpandedElements.add(element);
          }
          renderHtmlPreviewInspectorTree();
        });

        const label = formatInspectorElementLabel(element, getHtmlPreviewInspectorReferenceAssets());
        const labelButton = document.createElement("button");
        labelButton.className = "html-preview-inspector-node-label";
        labelButton.type = "button";
        appendHtmlPreviewInspectorLabelPart(labelButton, `<${label.tag}`, "tag");
        if (label.id) appendHtmlPreviewInspectorLabelPart(labelButton, `#${label.id}`, "id");
        if (label.classes.length) appendHtmlPreviewInspectorLabelPart(labelButton, `.${label.classes.join(".")}`, "class");
        appendHtmlPreviewInspectorLabelPart(labelButton, ">", "tag");
        if (label.assetName) appendHtmlPreviewInspectorLabelPart(labelButton, ` ${label.assetName}`, "asset");
        if (label.text) appendHtmlPreviewInspectorLabelPart(labelButton, ` “${label.text}”`, "text");
        labelButton.addEventListener("click", () => selectHtmlPreviewInspectorElement(element, "lock"));
        row.addEventListener("mouseenter", () => {
          htmlPreviewInspectorHoveredElement = element;
          updateHtmlPreviewInspectorHighlight();
        });
        row.addEventListener("mouseleave", () => {
          if (htmlPreviewInspectorHoveredElement === element) htmlPreviewInspectorHoveredElement = null;
          updateHtmlPreviewInspectorHighlight();
        });

        row.append(disclosure, labelButton);
        htmlPreviewInspectorTree.appendChild(row);
        if (children.length && htmlPreviewInspectorExpandedElements.has(element)) {
          children.forEach((child) => appendHtmlPreviewInspectorTreeNode(child, depth + 1));
        }
      }

      function appendHtmlPreviewInspectorLabelPart(parent, value, kind) {
        const part = document.createElement("span");
        part.className = `html-preview-inspector-token ${kind}`;
        part.textContent = value;
        parent.appendChild(part);
      }

      function selectHtmlPreviewInspectorElement(element, interactionType = "lock") {
        const screen = htmlPreviewInspectorScreen;
        if (!screen?.isConnected || !element?.isConnected || !screen.contains(element)) return;
        const nextSelection = reduceInspectorSelection(
          {
            selectedElement: htmlPreviewInspectorSelectedElement,
            locked: htmlPreviewInspectorSelectionLocked
          },
          {
            type: interactionType,
            targetElement: element
          }
        );
        if (
          nextSelection.selectedElement === htmlPreviewInspectorSelectedElement
          && nextSelection.locked === htmlPreviewInspectorSelectionLocked
        ) {
          return;
        }
        htmlPreviewInspectorSelectedElement = nextSelection.selectedElement;
        htmlPreviewInspectorSelectionLocked = nextSelection.locked;
        htmlPreviewInspectorHoveredElement = null;
        updateHtmlPreviewInspectorDeleteState();
        if (!htmlPreviewInspectorSelectedElement) {
          renderHtmlPreviewInspectorTree();
          renderHtmlPreviewInspectorDetails(null);
          updateHtmlPreviewInspectorHighlight();
          return;
        }
        let ancestor = htmlPreviewInspectorSelectedElement;
        while (ancestor && screen.contains(ancestor)) {
          htmlPreviewInspectorExpandedElements.add(ancestor);
          if (ancestor === screen) break;
          ancestor = ancestor.parentElement;
        }
        renderHtmlPreviewInspectorTree();
        renderHtmlPreviewInspectorDetails(htmlPreviewInspectorSelectedElement);
        updateHtmlPreviewInspectorHighlight();
      }

      function updateHtmlPreviewInspectorDeleteState() {
        htmlPreviewInspectorDelete.disabled = !(
          htmlPreviewInspectorSelectionLocked
          && canDeleteInspectorElement(htmlPreviewInspectorSelectedElement, htmlPreviewInspectorScreen)
        );
      }

      function handleHtmlPreviewInspectorDeleteKey(event) {
        if (
          !htmlPreviewDialog.classList.contains("open")
          || (event.key !== "Delete" && event.key !== "Backspace")
          || event.metaKey
          || event.ctrlKey
          || event.altKey
          || event.target?.matches?.("input,textarea,select,[contenteditable='true']")
          || htmlPreviewInspectorDelete.disabled
        ) {
          return;
        }
        event.preventDefault();
        void deleteSelectedHtmlPreviewInspectorElement();
      }

      async function deleteSelectedHtmlPreviewInspectorElement() {
        const element = htmlPreviewInspectorSelectedElement;
        if (
          !htmlPreviewInspectorSelectionLocked
          || !canDeleteInspectorElement(element, htmlPreviewInspectorScreen)
        ) {
          return false;
        }
        element.remove();
        htmlPreviewInspectorSelectedElement = null;
        htmlPreviewInspectorSelectionLocked = false;
        htmlPreviewInspectorHoveredElement = null;
        updateHtmlPreviewInspectorDeleteState();
        renderHtmlPreviewInspectorTree();
        renderHtmlPreviewInspectorDetails(null);
        updateHtmlPreviewInspectorHighlight();
        try {
          await calibrateHtmlPreviewReferenceAssets();
          persistCurrentHtmlPreviewDocument();
        } catch (error) {
          setStatus(`Slice calibration failed after deleting the element: ${error.message || String(error)}`, "error");
        }
        return true;
      }

      function updateHtmlPreviewInspectorHighlight() {
        const element = htmlPreviewInspectorHoveredElement || htmlPreviewInspectorSelectedElement;
        if (!element?.isConnected) {
          htmlPreviewInspectorHighlight.hidden = true;
          return;
        }
        const elementRect = element.getBoundingClientRect?.();
        if (!elementRect) {
          htmlPreviewInspectorHighlight.hidden = true;
          return;
        }
        const highlight = calculateInspectorHighlightRect({
          elementRect,
          iframeRect: htmlPreviewFrame.getBoundingClientRect(),
          viewportRect: htmlPreviewViewport.getBoundingClientRect(),
          zoom: htmlPreviewCanvasViewport?.getState().zoom || 1
        });
        const outside = highlight.left + highlight.width <= 0
          || highlight.top + highlight.height <= 0
          || highlight.left >= htmlPreviewViewport.clientWidth
          || highlight.top >= htmlPreviewViewport.clientHeight;
        if (outside) {
          htmlPreviewInspectorHighlight.hidden = true;
          return;
        }
        htmlPreviewInspectorHighlight.style.left = `${highlight.left}px`;
        htmlPreviewInspectorHighlight.style.top = `${highlight.top}px`;
        htmlPreviewInspectorHighlight.style.width = `${highlight.width}px`;
        htmlPreviewInspectorHighlight.style.height = `${highlight.height}px`;
        htmlPreviewInspectorHighlight.classList.toggle("label-inside", highlight.top < 24);
        htmlPreviewInspectorHighlight.classList.toggle(
          "selection-locked",
          htmlPreviewInspectorSelectionLocked && element === htmlPreviewInspectorSelectedElement
        );
        htmlPreviewInspectorHighlightLabel.textContent = `${formatHtmlPreviewInspectorMetric(elementRect.width)} × ${formatHtmlPreviewInspectorMetric(elementRect.height)}`;
        htmlPreviewInspectorHighlight.hidden = false;
      }

      function formatHtmlPreviewInspectorMetric(value) {
        const number = Number(value);
        if (!Number.isFinite(number)) return "0";
        return String(Math.round(number * 100) / 100);
      }

      function renderHtmlPreviewInspectorDetails(element) {
        htmlPreviewInspectorDetails.replaceChildren();
        const title = document.createElement("div");
        title.className = "html-preview-inspector-section-title";
        const imageAsset = readInspectorImageAsset(element, getHtmlPreviewInspectorReferenceAssets());
        title.textContent = imageAsset ? "Slice asset" : "Layout";
        htmlPreviewInspectorDetails.appendChild(title);
        if (imageAsset) {
          const preview = document.createElement("figure");
          preview.className = "html-preview-inspector-asset-preview";
          const image = document.createElement("img");
          image.src = imageAsset.dataUrl;
          image.alt = imageAsset.name;
          const caption = document.createElement("figcaption");
          caption.textContent = imageAsset.name;
          preview.append(image, caption);
          htmlPreviewInspectorDetails.appendChild(preview);
          return;
        }
        const layout = readInspectorLayout(element, htmlPreviewInspectorScreen);
        if (!layout) {
          renderHtmlPreviewInspectorEmpty(htmlPreviewInspectorDetails, "Select an element to view layout");
          return;
        }
        appendHtmlPreviewInspectorDetailGroup("Geometry", [
          ["x", `${layout.geometry.x}px`],
          ["y", `${layout.geometry.y}px`],
          ["width", `${layout.geometry.width}px`],
          ["height", `${layout.geometry.height}px`]
        ]);
        appendHtmlPreviewInspectorDetailGroup("Box model", [
          ["margin", formatHtmlPreviewInspectorSides(layout.margin)],
          ["border", formatHtmlPreviewInspectorSides(layout.border)],
          ["padding", formatHtmlPreviewInspectorSides(layout.padding)]
        ]);
        appendHtmlPreviewInspectorDetailGroup("Layout", Object.entries(layout.layout));
        appendHtmlPreviewInspectorDetailGroup("Typography", Object.entries(layout.typography));
        appendHtmlPreviewInspectorDetailGroup("Appearance", Object.entries(layout.appearance));
      }

      function appendHtmlPreviewInspectorDetailGroup(name, entries) {
        const group = document.createElement("section");
        group.className = "html-preview-inspector-detail-group";
        const heading = document.createElement("strong");
        heading.textContent = name;
        group.appendChild(heading);
        entries.forEach(([label, value]) => {
          const row = document.createElement("div");
          row.className = "html-preview-inspector-detail-row";
          const key = document.createElement("span");
          key.textContent = label;
          const output = document.createElement("code");
          output.textContent = value || "—";
          row.append(key, output);
          group.appendChild(row);
        });
        htmlPreviewInspectorDetails.appendChild(group);
      }

      function formatHtmlPreviewInspectorSides(sides) {
        return [sides.top, sides.right, sides.bottom, sides.left].map((value) => value || "0px").join(" ");
      }

      function renderHtmlPreviewInspectorEmpty(parent, message) {
        const empty = document.createElement("div");
        empty.className = "html-preview-inspector-empty";
        empty.textContent = message;
        parent.appendChild(empty);
      }

      function resetHtmlPreviewInspector() {
        cleanupHtmlPreviewInspectorPicker?.();
        cleanupHtmlPreviewInspectorPicker = null;
        htmlPreviewInspectorScreen = null;
        htmlPreviewInspectorSelectedElement = null;
        htmlPreviewInspectorSelectionLocked = false;
        htmlPreviewInspectorHoveredElement = null;
        updateHtmlPreviewInspectorDeleteState();
        htmlPreviewInspectorExpandedElements.clear();
        htmlPreviewInspectorResizeDrag = null;
        htmlPreviewBody.classList.remove("inspector-resizing");
        setHtmlPreviewInspectorWidth(360);
        htmlPreviewInspectorHighlight.hidden = true;
        htmlPreviewInspectorHighlightLabel.textContent = "";
        htmlPreviewInspectorTree.replaceChildren();
        renderHtmlPreviewInspectorEmpty(htmlPreviewInspectorTree, "Waiting for preview content");
        renderHtmlPreviewInspectorDetails(null);
      }

      function cleanupHtmlPreviewImages() {
        const doc = htmlPreviewFrame.contentDocument;
        if (!doc) {
          return;
        }
        for (const image of [...doc.querySelectorAll("img")]) {
          const src = image.currentSrc || image.getAttribute("src") || "";
          if (!isFigmaImageDataUrl(src)) {
            image.remove();
            continue;
          }
          image.addEventListener("error", () => image.remove(), { once: true });
        }
      }

      function persistCurrentHtmlPreviewDocument() {
        const doc = htmlPreviewFrame.contentDocument;
        if (!doc?.documentElement || !activeHtmlPreviewResult) return;
        const canonicalDoc = doc.cloneNode(true);
        canonicalDoc.querySelectorAll(
          "style[data-reference-asset-corrections],style[data-reference-owner-guard]"
        ).forEach((style) => style.remove());
        const canonicalHtml = dehydrateCanonicalAssetHtml(
          `<!doctype html>\n${canonicalDoc.documentElement.outerHTML}`
        );
        activeHtmlPreviewResult.canonicalHtml = canonicalHtml;
        if (htmlPreviewCache) {
          htmlPreviewCache.canonicalHtml = canonicalHtml;
        }
        scheduleWorkspaceDraftSave();
      }

      const REFERENCE_OWNER_SELECTOR = [
        "a",
        "button",
        "article",
        "li",
        '[role="button"]',
        '[class*="item"]',
        '[class*="card"]',
        '[class*="row"]',
        '[class*="tile"]',
        '[class*="entry"]'
      ].join(",");

      function getHtmlPreviewElementDepth(element, screen) {
        let depth = 0;
        let current = element;
        while (current && current !== screen) {
          depth += 1;
          current = current.parentElement;
        }
        return depth;
      }

      function isHtmlPreviewReferenceOwnerCandidate(element, screen) {
        return Boolean(
          element
          && element !== screen
          && !element.matches(".fit-shell,.fit-box,[data-reference-asset]")
          && element.matches(REFERENCE_OWNER_SELECTOR)
        );
      }

      function getHtmlPreviewReferenceOwnerName(element) {
        const readableClass = [...element.classList].find((name) =>
          !name.startsWith("plugin-")
          && !/^export-/.test(name)
        );
        return String(
          readableClass
          || element.getAttribute("aria-label")
          || element.tagName?.toLowerCase()
          || "component"
        ).slice(0, 80);
      }

      function markHtmlPreviewReferenceOwner(doc, owner, nextId) {
        let id = owner.getAttribute("data-reference-owner-id");
        if (!id) {
          id = `reference-owner-${nextId()}`;
          owner.setAttribute("data-reference-owner-id", id);
          owner.setAttribute("data-reference-owner-name", getHtmlPreviewReferenceOwnerName(owner));
        }
        const position = doc.defaultView?.getComputedStyle(owner)?.position;
        if (!position || position === "static") {
          owner.classList.add("plugin-reference-owner-positioned");
        }
        return id;
      }

      function normalizeHtmlPreviewReferenceAssetOwnership() {
        const doc = htmlPreviewFrame.contentDocument;
        const screen = doc?.querySelector(".fit-shell > .fit-box > .screen");
        if (!doc || !screen) return;
        let ownerSequence = 0;
        const nextOwnerId = () => {
          ownerSequence += 1;
          return ownerSequence;
        };
        let ownerStyle = doc.querySelector("style[data-reference-owner-guard]");
        if (!ownerStyle) {
          ownerStyle = doc.createElement("style");
          ownerStyle.setAttribute("data-reference-owner-guard", "");
          ownerStyle.textContent = ".plugin-reference-owner-positioned{position:relative!important;}";
          doc.head.appendChild(ownerStyle);
        }

        const screenRect = screen.getBoundingClientRect();
        const candidates = [...screen.querySelectorAll(REFERENCE_OWNER_SELECTOR)]
          .filter((element) => isHtmlPreviewReferenceOwnerCandidate(element, screen))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              element,
              rect: {
                x: rect.left - screenRect.left,
                y: rect.top - screenRect.top,
                width: rect.width,
                height: rect.height
              },
              depth: getHtmlPreviewElementDepth(element, screen)
            };
          })
          .filter((candidate) => candidate.rect.width > 0 && candidate.rect.height > 0);
        const assetsById = new Map(activeHtmlPreviewAssets.map((asset) => [String(asset?.id || ""), asset]));

        for (const node of [...screen.querySelectorAll("[data-reference-asset]")]) {
          const id = String(node.getAttribute("data-reference-asset") || "");
          const existingOwner = node.parentElement?.closest(REFERENCE_OWNER_SELECTOR);
          if (existingOwner && screen.contains(existingOwner) && isHtmlPreviewReferenceOwnerCandidate(existingOwner, screen)) {
            markHtmlPreviewReferenceOwner(doc, existingOwner, nextOwnerId);
            continue;
          }
          const asset = assetsById.get(id);
          const placement = asset?.placement;
          const nodeRect = node.getBoundingClientRect();
          const assetRect = placement
            ? {
                x: Number(placement.x),
                y: Number(placement.y),
                width: Number(placement.width),
                height: Number(placement.height)
              }
            : {
                x: nodeRect.left - screenRect.left,
                y: nodeRect.top - screenRect.top,
                width: nodeRect.width,
              height: nodeRect.height
            };
          const isScreenSizedAsset = assetRect.x <= 0.5
            && assetRect.y <= 0.5
            && assetRect.width >= screenRect.width - 1
            && assetRect.height >= screenRect.height - 1;
          if (isScreenSizedAsset) {
            // A full-screen background belongs directly to the screen. If it
            // is reparented into an overlapping panel, it creates a new
            // stacking context and covers the panel's editable content.
            continue;
          }
          const selected = chooseReferenceAssetOwnerCandidate(assetRect, candidates);
          if (!selected?.element) continue;
          markHtmlPreviewReferenceOwner(doc, selected.element, nextOwnerId);
          selected.element.appendChild(node);
        }
      }

      function waitForHtmlPreviewPaint() {
        return new Promise((resolve) => {
          const requestFrame = htmlPreviewFrame.contentWindow?.requestAnimationFrame;
          if (typeof requestFrame === "function") {
            requestFrame.call(htmlPreviewFrame.contentWindow, () => resolve());
            return;
          }
          resolve();
        });
      }

      function measureHtmlPreviewReferenceAssets(screen, assets) {
        const screenRect = screen.getBoundingClientRect();
        const nodes = [...screen.querySelectorAll("[data-reference-asset]")];
        return assets.map((asset) => {
          const id = String(asset?.id || "");
          const node = nodes.find((element) => element.getAttribute("data-reference-asset") === id);
          if (!node) {
            throw new Error(`The preview is missing slice node: ${id}`);
          }
          const rect = node.getBoundingClientRect();
          return {
            id,
            x: rect.left - screenRect.left,
            y: rect.top - screenRect.top,
            width: rect.width,
            height: rect.height
          };
        });
      }

      function writeHtmlPreviewReferenceAssetCorrections(doc, corrections) {
        let style = doc.querySelector("style[data-reference-asset-corrections]");
        if (!style) {
          style = doc.createElement("style");
          style.setAttribute("data-reference-asset-corrections", "");
          doc.head.appendChild(style);
        }
        style.textContent = buildReferenceAssetCorrectionCss(corrections);
        activeHtmlPreviewCalibrationCss = style.textContent;
      }

      function measureHtmlPreviewReferenceAssetExportGeometries(screen, assets) {
        const doc = screen.ownerDocument;
        const screenRect = screen.getBoundingClientRect();
        const nodes = [...screen.querySelectorAll("[data-reference-asset]")];
        return assets.map((asset) => {
          const id = String(asset?.id || "");
          const node = nodes.find((element) => element.getAttribute("data-reference-asset") === id);
          if (!node) {
            throw new Error(`The preview is missing slice node: ${id}`);
          }
          const candidate = node.offsetParent;
          const containingBlock = candidate
            && candidate !== doc.body
            && screen.contains(candidate)
            && typeof candidate.getBoundingClientRect === "function"
            ? candidate
            : screen;
          const containingRect = containingBlock.getBoundingClientRect();
          const containingStyle = doc.defaultView?.getComputedStyle(containingBlock);
          return createReferenceAssetLocalGeometry(asset, {
            x: containingRect.left - screenRect.left + Number.parseFloat(containingStyle?.borderLeftWidth || "0"),
            y: containingRect.top - screenRect.top + Number.parseFloat(containingStyle?.borderTopWidth || "0")
          });
        });
      }

      async function calibrateHtmlPreviewReferenceAssets() {
        const doc = htmlPreviewFrame.contentDocument;
        if (!doc || doc.querySelectorAll(".screen").length !== 1) {
          throw new Error("The HTML returned by AI must contain exactly one .screen frame");
        }
        const screen = doc.querySelector(".fit-shell > .fit-box > .screen");
        const assets = activeHtmlPreviewAssets;
        if (!screen) {
          throw new Error("The HTML returned by AI is missing the .fit-shell > .fit-box > .screen wrapper structure");
        }
        if (!assets.length) {
          activeHtmlPreviewCalibrationCss = "";
          activeHtmlPreviewExportGeometries = [];
          return;
        }
        screen.style.setProperty("padding", "0", "important");
        screen.style.setProperty("border", "0", "important");
        screen.style.setProperty("transform", "none", "important");
        const tolerance = 0.5;
        let corrections = createReferenceAssetGeometryCorrections(
          assets,
          measureHtmlPreviewReferenceAssets(screen, assets),
          tolerance
        );
        writeHtmlPreviewReferenceAssetCorrections(doc, corrections);
        await waitForHtmlPreviewPaint();

        const secondMeasurements = measureHtmlPreviewReferenceAssets(screen, assets);
        const secondById = new Map(secondMeasurements.map((item) => [item.id, item]));
        corrections = corrections.map((current) => {
          const expected = assets.find((asset) => String(asset?.id || "") === current.id)?.placement;
          const measured = secondById.get(current.id);
          if (!expected || !measured) return current;
          return {
            ...current,
            translateX: current.translateX + Number(expected.x) - Number(measured.x),
            translateY: current.translateY + Number(expected.y) - Number(measured.y)
          };
        });
        writeHtmlPreviewReferenceAssetCorrections(doc, corrections);
        await waitForHtmlPreviewPaint();

        const finalMeasurements = measureHtmlPreviewReferenceAssets(screen, assets);
        const invalidIds = finalMeasurements.filter((measured) => {
          const expected = assets.find((asset) => String(asset?.id || "") === measured.id)?.placement;
          return !expected
            || Math.abs(Number(expected.x) - measured.x) > tolerance
            || Math.abs(Number(expected.y) - measured.y) > tolerance
            || Math.abs(Number(expected.width) - measured.width) > tolerance
            || Math.abs(Number(expected.height) - measured.height) > tolerance;
        }).map((item) => item.id);
        if (invalidIds.length) {
          throw new Error(`Slice coordinate calibration failed: ${invalidIds.join(", ")}`);
        }
        activeHtmlPreviewExportGeometries = measureHtmlPreviewReferenceAssetExportGeometries(screen, assets);
      }

      function inspectLoadedEditableDocumentQuality() {
        const doc = htmlPreviewFrame.contentDocument;
        const screen = doc?.querySelector(".screen");
        if (!doc || !screen) return [];
        const warnings = [];
        const descendants = [...screen.querySelectorAll("*")];
        const directChildren = [...screen.children];
        const inlineStyleCount = descendants.filter((node) => node.hasAttribute("style")).length;
        const namedClassCount = descendants.filter((node) =>
          [...node.classList].some((name) =>
            /[A-Za-z]/.test(name) && !/^(box|text|item)-?\d+$/i.test(name)
          )
        ).length;
        if (!String(doc.title || "").trim()) {
          warnings.push("The page returned by AI has no title; the frame name will be used when downloading.");
        }
        if (descendants.length >= 20 && directChildren.length / descendants.length > 0.8) {
          warnings.push("The page structure returned by AI is still fairly flat; re-run recognition for a structure that is easier to develop with.");
        }
        if (inlineStyleCount > 0) {
          warnings.push(`AI returned ${inlineStyleCount} inline styles; they will be moved to CSS mechanically when downloading.`);
        }
        if (descendants.length >= 12 && namedClassCount / descendants.length < 0.5) {
          warnings.push("AI returned few readable classes; naming may need to be added during later development.");
        }
        warnings.forEach((message) => setStatus(message, "warning"));
        return warnings;
      }

      async function initializeLoadedHtmlPreview(sequence) {
        htmlPreviewDownload.disabled = true;
        htmlPreviewImport.disabled = true;
        cleanupHtmlPreviewImages();
        normalizeHtmlPreviewReferenceAssetOwnership();
        await calibrateHtmlPreviewReferenceAssets();
        if (sequence !== htmlPreviewLoadSequence) return;
        inspectLoadedEditableDocumentQuality();
        initializeHtmlPreviewZoom();
        initializeHtmlPreviewInspector();
        htmlPreviewDownload.disabled = false;
        htmlPreviewImport.disabled = !activeHtmlPreviewResult?.canonicalHtml;
      }

      function waitForHtmlPreviewReady() {
        return htmlPreviewReadyPromise;
      }

      function closeHtmlPreview() {
        htmlPreviewLoadSequence += 1;
        closeHtmlPreviewImportSettings();
        htmlPreviewDialog.classList.remove("open");
        resetHtmlPreviewZoomView();
        resetHtmlPreviewInspector();
        htmlPreviewFrame.srcdoc = "";
        activeHtmlPreviewAssets = [];
        activeHtmlPreviewCalibrationCss = "";
        activeHtmlPreviewExportGeometries = [];
        htmlPreviewReadyPromise = Promise.resolve();
        htmlPreviewDownload.disabled = true;
        htmlPreviewImport.disabled = true;
      }

      function closeHtmlPreviewImportSettings() {
        htmlPreviewImportSettingsPopover.hidden = true;
        htmlPreviewImportSettings.setAttribute("aria-expanded", "false");
      }

      async function downloadEditableHtmlZip() {
        const screen = currentManifest?.screen;
        if (!activeHtmlPreviewResult?.canonicalHtml || !screen?.width || !screen?.height) return;
        htmlPreviewDownload.disabled = true;
        htmlPreviewDownload.textContent = "Packaging...";
        let previewReady = false;
        try {
          await waitForHtmlPreviewReady();
          previewReady = true;
          const previewContext = await refreshCurrentEditablePreviewAssets();
          const referenceAssets = previewContext.localAssets;
          const doc = htmlPreviewFrame.contentDocument;
          if (!doc?.documentElement) {
            throw new Error("Cannot read the AI layer import preview");
          }
          const exportedDoc = doc.cloneNode(true);
          normalizeEditableExportHead(exportedDoc);
          const exportedScreen = exportedDoc.querySelector(".screen");
          if (!exportedScreen?.parentNode) {
            throw new Error("The AI layer import preview has no frame to export");
          }
          const cssParts = [...exportedDoc.querySelectorAll("style")]
            .filter((style) =>
              !style.hasAttribute("data-reference-asset-corrections")
              && !style.hasAttribute("data-reference-owner-guard")
            )
            .map((style) => style.textContent || "");
          exportedDoc.querySelectorAll("style").forEach((style) => style.remove());
          const stylesheet = exportedDoc.createElement("link");
          stylesheet.rel = "stylesheet";
          stylesheet.href = "./styles.css";
          exportedDoc.head.appendChild(stylesheet);

          const fitScript = exportedDoc.createElement("script");
          fitScript.src = "./script.js";
          exportedDoc.body.appendChild(fitScript);

          const activeImage = getActiveResultImage();
          const currentAssets = new Map((activeImage?.sliceManifest?.assets || []).map((asset) => [String(asset.id || ""), asset]));
          const usedNames = new Set();
          const assetFiles = [];
          const assetExportCss = [];
          let exportedAssetIndex = 0;
          for (const referenceAsset of referenceAssets) {
            const id = String(referenceAsset.id || "");
            const nodes = [...exportedDoc.querySelectorAll("[data-reference-asset]")]
              .filter((node) => node.getAttribute("data-reference-asset") === id);
            if (!nodes.length) continue;
            const sourceAsset = currentAssets.get(id);
            const extension = sourceAsset?.svgData ? "svg" : "png";
            const basename = reserveSliceAssetName(sourceAsset?.name || referenceAsset.name, usedNames);
            const filename = `assets/${basename}.${extension}`;
            nodes.forEach((node) => {
              exportedAssetIndex += 1;
              const className = `export-reference-asset-${exportedAssetIndex}`;
              node.classList.add(className);
              node.setAttribute("src", `./${filename}`);
              node.removeAttribute("data-reference-asset");
              const geometry = activeHtmlPreviewExportGeometries.find((item) => item.id === id);
              if (!geometry) throw new Error(`Missing slice export coordinates: ${id}`);
              assetExportCss.push(buildReferenceAssetExportCss(className, geometry));
            });
            assetFiles.push({
              name: filename,
              data: extension === "svg"
                ? textToUint8Array(sourceAsset.svgData)
                : dataUrlToUint8Array(referenceAsset.dataUrl)
            });
          }

          exportedDoc.querySelectorAll("[data-reference-asset]").forEach((node) => {
            node.removeAttribute("data-reference-asset");
          });
          const ownerPositionCss = [];
          [...exportedDoc.querySelectorAll(".plugin-reference-owner-positioned")].forEach((node, index) => {
            const className = `export-reference-owner-${index + 1}`;
            node.classList.remove("plugin-reference-owner-positioned");
            node.classList.add(className);
            ownerPositionCss.push(`.${className}{position:relative!important;}`);
          });
          exportedDoc.querySelectorAll("[data-reference-owner-id],[data-reference-owner-name]").forEach((node) => {
            node.removeAttribute("data-reference-owner-id");
            node.removeAttribute("data-reference-owner-name");
          });
          const inlineStyleCss = [];
          [...exportedDoc.querySelectorAll("[style]")].forEach((node, index) => {
            const cssText = String(node.getAttribute("style") || "").trim();
            node.removeAttribute("style");
            if (!cssText) return;
            const className = `export-inline-style-${index + 1}`;
            node.classList.add(className);
            inlineStyleCss.push(`.${className}{${cssText}}`);
          });
          if (!String(exportedDoc.title || "").trim()) {
            exportedDoc.title = screen.name || "editable-design";
          }

          const css = [
            ...cssParts,
            ...inlineStyleCss,
            ...ownerPositionCss,
            ...assetExportCss,
            buildFastEditableExportCss(screen)
          ].join("\n");
          const html = `<!doctype html>\n${exportedDoc.documentElement.outerHTML}`;
          const files = createFastEditableExportFiles({
            html,
            css,
            script: buildFastEditableExportScript(screen),
            assets: assetFiles,
            textToBytes: textToUint8Array
          });
          const zipBlob = createZipBlob(files);
          const screenName = sanitizeFilename(screen.name || "editable-design");
          triggerBlobDownload(zipBlob, `${screenName}-html.zip`);
        } catch (error) {
          console.error("Failed to download the editable design HTML.", error);
          setStatus(`Failed to download HTML: ${error.message || String(error)}`, "error");
        } finally {
          htmlPreviewDownload.disabled = !previewReady;
          htmlPreviewDownload.textContent = "Download HTML";
        }
      }

      async function importHtmlPreviewToFigma() {
        if (!canStartFigmaImport()) return;
        if (!activeHtmlPreviewResult?.canonicalHtml) {
          setStatus("Open the AI layer import preview first.", "warning");
          return;
        }

        let importPosted = false;
        try {
          await refreshCurrentEditablePreviewAssets();
          setBusy(
            true,
            htmlPreviewHighFidelityCaptureEnabled
              ? "Capturing with Playwright/CDP high fidelity…"
              : "Capturing the AI layer import preview DOM…"
          );
          const capturedManifest = await captureHtmlPreviewAsEditableManifest({
            highFidelity: htmlPreviewHighFidelityCaptureEnabled
          });
          const manifest = await prepareEditableManifestForFigma(
            capturedManifest,
            ensurePngOrJpegDataUrl
          );
          if (figExportUiMode.downloadsFig) {
            setBusy(true, "Generating a .fig file that can be imported into Figma…");
            await downloadFigManifest("editable", manifest);
            setStatus("The design .fig download has started.", "success");
            return;
          }
          setBusy(true, "Sending editable layers to Figma…");
          const requestId = beginFigmaImportRequest();
          parent.postMessage(
            {
              pluginMessage: {
                type: "create-editable-design-screen",
                requestId,
                manifest
              }
            },
            "*"
          );
          importPosted = true;
        } catch (error) {
          console.error("Failed to import H5 into Figma.", error);
          setStatus(
            `${figExportUiMode.downloadsFig ? "Download Design .fig" : "Import to Figma"} failed: ${error.message || String(error)}`,
            "error"
          );
        } finally {
          if (!importPosted) setBusy(false);
        }
      }

      async function downloadSliceFig() {
        if (!currentManifest) return;
        setBusy(true, "Building the slice .fig…");
        try {
          const manifest = await buildPlacementManifest(currentManifest);
          setBusy(true, "Generating a slice .fig that can be imported into Figma…");
          await downloadFigManifest("slice", manifest);
          setStatus("The slice .fig download has started.", "success");
        } catch (error) {
          console.error("Failed to download the slice .fig.", error);
          setStatus(`Failed to download the slice .fig: ${error.message || String(error)}`, "error");
        } finally {
          setBusy(false);
        }
      }

      async function downloadFigManifest(kind, manifest) {
        const result = await requestFigExport({ kind, manifest }, { fetchBackend });
        triggerBlobDownload(result.blob, result.filename);
      }

      async function captureHtmlPreviewWithWebToFigma(doc = htmlPreviewFrame.contentDocument) {
        if (!doc) {
          throw new Error("Cannot read the AI layer import preview iframe");
        }
        const screenElement = doc.querySelector(".screen") || doc.body;
        if (!screenElement) {
          throw new Error("The AI layer import preview has no frame to capture");
        }
        await ensureWebToFigmaCaptureRuntime(doc);
        const rawCapture = await doc.defaultView.figma.captureRawForDesign(".screen");
        const capture = typeof rawCapture === "string" ? JSON.parse(rawCapture) : rawCapture;
        if (!capture?.root?.rect) {
          throw new Error("web-to-figma returned no valid DOM capture data");
        }
        return capture;
      }

      async function captureHtmlPreviewWithPlaywright(doc, screen) {
        if (!doc?.documentElement) {
          throw new Error("Cannot read the high-fidelity capture page");
        }
        const response = await fetchBackend("/api/design/capture-figma", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            html: `<!doctype html>\n${doc.documentElement.outerHTML}`,
            width: screen.width,
            height: screen.height
          })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(
            result.error || `Playwright high-fidelity capture failed: ${response.status}`
          );
        }
        if (!result.capture?.root?.rect) {
          throw new Error("Playwright high-fidelity capture returned no valid DOM data");
        }
        return result.capture;
      }

      async function ensureWebToFigmaCaptureRuntime(doc) {
        const win = doc.defaultView;
        if (win?.figma?.captureRawForDesign) {
          return;
        }
        const runtime = document.getElementById("webToFigmaCaptureRuntime")?.textContent;
        if (!runtime) {
          throw new Error("web-to-figma capture runtime is not loaded");
        }
        const script = doc.createElement("script");
        script.textContent = runtime;
        doc.documentElement.appendChild(script);
        script.remove();
        await new Promise((resolve) => win.requestAnimationFrame(() => resolve()));
        if (!win.figma?.captureRawForDesign) {
          throw new Error("web-to-figma capture runtime failed to initialize");
        }
      }

      function mapWebToFigmaCaptureToEditableManifest(capture, { fixedSize = false } = {}) {
        const root = capture.root;
        const rootRect = root.rect;
        const targetWidth = currentManifest.screen.width;
        const targetHeight = currentManifest.screen.height;
        if (fixedSize) {
          assertFixedCaptureRootSize(rootRect, {
            width: targetWidth,
            height: targetHeight
          });
        }
        const scaleX = fixedSize ? 1 : targetWidth / rootRect.width;
        const scaleY = fixedSize ? 1 : targetHeight / rootRect.height;
        const nodes = [];
        const assets = capture.assets || {};
        const seenReferenceAssetIds = new Set();
        const activeReferenceAssets = getActiveResultImage()?.sliceManifest?.assets || [];
        const referenceAssetById = new Map(activeReferenceAssets.map((asset) => [String(asset?.id || ""), asset]));
        const rootFill = extractSolidCssColor(root.styles?.backgroundColor) || "#F7F8FA";
        const rootGradient = parseFigmaCompatibleCssGradient(root.styles);
        let activeCaptureZIndex = 0;
        let captureOrder = 0;

        const pushNode = (node) => {
          if (!node) {
            return;
          }
          if (node.width < 1 || node.height < 1) {
            return;
          }
          if (node.x > targetWidth || node.y > targetHeight || node.x + node.width < 0 || node.y + node.height < 0) {
            return;
          }
          const explicitCaptureOrder = Number(node.captureOrder);
          nodes.push({
            ...node,
            captureZIndex: Number.isFinite(Number(node.captureZIndex))
              ? Number(node.captureZIndex)
              : activeCaptureZIndex,
            captureOrder: Number.isFinite(explicitCaptureOrder)
              ? explicitCaptureOrder
              : captureOrder++
          });
        };

        const toBox = (rect) => {
          if (!rect || !rect.width || !rect.height) {
            return null;
          }
          return {
            x: Math.round((rect.x - rootRect.x) * scaleX),
            y: Math.round((rect.y - rootRect.y) * scaleY),
            width: Math.round(rect.width * scaleX),
            height: Math.round(rect.height * scaleY)
          };
        };

        const visit = (node, parent = null, inheritedZIndex = 0, inheritedSemanticGroup = null) => {
          if (!node) {
            return;
          }
          if (node.nodeType === 3) {
            const text = String(node.text || "").replace(/\s+/g, " ").trim();
            const style = parent?.styles || {};
            activeCaptureZIndex = readCapturedZIndex(style, inheritedZIndex);
            const box = toBox(node.rect);
            const pushCapturedNode = (definition) => pushNode(inheritedSemanticGroup
              ? {
                  ...definition,
                  semanticGroupId: inheritedSemanticGroup.id,
                  semanticGroupName: inheritedSemanticGroup.name
                }
              : definition);
            if (text && box) {
              const fontSize = Number.parseFloat(style.fontSize || "16");
              const lineHeight = parseCssLineHeight(style, fontSize);
              const textBox = sizeCapturedTextBox({
                width: node.rect.width,
                height: node.rect.height,
                fontSize,
                lineHeight,
                scaleX,
                scaleY
              });
              const textPosition = positionCapturedTextBox({
                x: node.rect.x,
                y: node.rect.y,
                height: node.rect.height,
                lineHeight,
                lineCount: node.lineCount,
                rootX: rootRect.x,
                rootY: rootRect.y,
                scaleX,
                scaleY
              });
              const arrowIconName = inferArrowIconFromText(text);
              if (arrowIconName) {
                const iconSize = Math.max(
                  8,
                  Math.round(Math.max(box.width, box.height, fontSize * Math.max(scaleX, scaleY)))
                );
                pushCapturedNode({
                  type: "icon",
                  name: safeLayerName(`web_${arrowIconName}`),
                  iconName: arrowIconName,
                  x: box.x,
                  y: box.y,
                  width: Math.max(box.width, iconSize),
                  height: Math.max(box.height, iconSize),
                  color: extractSolidCssColor(style.color) || "#111318",
                  opacity: clampNumber(Number(style.opacity), 0.05, 1, 1),
                  strokeWidth: Math.max(1.5, Math.min(3.5, iconSize * 0.09))
                });
              } else {
                pushCapturedNode({
                  type: "text",
                  name: safeLayerName(parent?.owningReactComponent || parent?.tag || "web_text"),
                  text: text.length > 160 ? `${text.slice(0, 157)}...` : text,
                  x: textPosition.x,
                  y: textPosition.y,
                  width: textBox.width,
                  height: textBox.height,
                  fontSize: Math.max(8, Math.round(fontSize * scaleY)),
                  fontWeight: normalizeCssFontWeight(style.fontWeight || "400"),
                  lineHeight: Math.max(10, Math.round(lineHeight * scaleY)),
                  color: extractSolidCssColor(style.color) || "#111318",
                  opacity: clampNumber(Number(style.opacity), 0.05, 1, 1)
                });
              }
            }
            return;
          }
          if (node.nodeType !== 1) {
            return;
          }
          const style = node.styles || {};
          const nodeZIndex = readCapturedZIndex(style, inheritedZIndex);
          const semanticGroup = resolveCapturedSemanticGroup(node, inheritedSemanticGroup);
          const pushCapturedNode = (definition) => pushNode(semanticGroup
            ? {
                ...definition,
                semanticGroupId: semanticGroup.id,
                semanticGroupName: semanticGroup.name
              }
            : definition);
          activeCaptureZIndex = nodeZIndex;
          if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity || 1) <= 0.01) {
            return;
          }
          const isRoot = node === root;
          const box = toBox(node.rect);
          if (!isRoot && box) {
            const tag = String(node.tag || "").toLowerCase();
            const cssChevronIconName = inferCssChevronIcon(node);
            if (cssChevronIconName) {
              const iconSize = Math.max(8, Math.round(Math.max(box.width, box.height)));
              pushCapturedNode({
                type: "icon",
                name: safeLayerName(`web_${cssChevronIconName}`),
                iconName: cssChevronIconName,
                x: box.x,
                y: box.y,
                width: iconSize,
                height: iconSize,
                color: extractSolidCssColor(style.borderTopColor) || "#111318",
                opacity: clampNumber(Number(style.opacity), 0.05, 1, 1),
                strokeWidth: Math.max(1.5, Math.min(3.5, Number.parseFloat(style.borderTopWidth || "2") * scaleX))
              });
              return;
            }
            const imageUrl = getWebToFigmaElementImageUrl(node, assets);
            const referenceAssetId = getWebToFigmaReferenceAssetId(node, imageUrl);
            if (referenceAssetId) {
              seenReferenceAssetIds.add(referenceAssetId);
            }
            if (fixedSize && tag === "img" && referenceAssetId) {
              const sourceAsset = referenceAssetById.get(referenceAssetId);
              const authoritativeNode = createFastAuthoritativeAssetNode(
                sourceAsset,
                getSliceRadius(sourceAsset, currentManifest?.screen),
                nodeZIndex
              );
              if (authoritativeNode) {
                authoritativeNode.name = safeLayerName(authoritativeNode.name);
                pushCapturedNode(authoritativeNode);
                return;
              }
            }
            if (isSvgDataUrl(imageUrl)) {
              pushCapturedNode({
                type: "svg",
                name: safeLayerName(node.attributes?.alt || node.attributes?.id || referenceAssetId || node.owningReactComponent || tag || "web_svg"),
                svgData: decodeSvgDataUrl(imageUrl),
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height,
                radius: scaleWebToFigmaRadius(style, scaleX, scaleY),
                radii: scaleWebToFigmaRadii(style, scaleX, scaleY),
                sourceAssetId: referenceAssetId || undefined
              });
            } else if (isFigmaImageDataUrl(imageUrl)) {
              pushCapturedNode({
                type: "image",
                name: safeLayerName(node.attributes?.alt || node.attributes?.id || referenceAssetId || node.owningReactComponent || tag || "web_image"),
                dataUrl: imageUrl,
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height,
                radius: scaleWebToFigmaRadius(style, scaleX, scaleY),
                radii: scaleWebToFigmaRadii(style, scaleX, scaleY),
                scaleMode: cssImageScaleMode(style, referenceAssetId),
                sourceAssetId: referenceAssetId || undefined
              });
            } else if (tag === "svg" && node.content) {
              pushCapturedNode({
                type: "svg",
                name: safeLayerName(node.attributes?.id || node.owningReactComponent || "web_svg"),
                svgData: node.content,
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height,
                radius: scaleWebToFigmaRadius(style, scaleX, scaleY),
                radii: scaleWebToFigmaRadii(style, scaleX, scaleY),
                sourceAssetId: referenceAssetId || undefined
              });
            } else {
              const backgroundPaint = extractSolidCssPaint(style.backgroundColor);
              const background = backgroundPaint?.color || "";
              const gradient = node.editableGradient || parseFigmaCompatibleCssGradient(style);
              const clipPath = style.clipPath || style["clip-path"] || "";
              const clipPathSvg = (background || gradient) && clipPath
                ? createCssClipPathSvg(
                  clipPath,
                  box.width,
                  box.height,
                  gradient || background,
                  clampNumber(Number(style.opacity), 0, 1, 1) * (gradient ? 1 : (backgroundPaint?.opacity ?? 1))
                )
                : "";
              const borderWidth = Math.max(0, Number.parseFloat(style.borderTopWidth || "0"));
              const borderColor = borderWidth > 0 ? extractSolidCssColor(style.borderTopColor) : "";
              const hasShadow = style.boxShadow && style.boxShadow !== "none";
              if (clipPathSvg) {
                pushCapturedNode({
                  type: "svg",
                  name: safeLayerName(node.attributes?.id || node.owningReactComponent || tag || "web_clip_path"),
                  svgData: clipPathSvg,
                  x: box.x,
                  y: box.y,
                  width: box.width,
                  height: box.height
                });
              } else if (background || gradient || borderColor || hasShadow) {
                pushCapturedNode({
                  type: "rect",
                  name: safeLayerName(node.attributes?.id || node.owningReactComponent || tag || "web_shape"),
                  x: box.x,
                  y: box.y,
                  width: box.width,
                  height: box.height,
                  radius: scaleWebToFigmaRadius(style, scaleX, scaleY),
                  radii: scaleWebToFigmaRadii(style, scaleX, scaleY),
                  fill: background || null,
                  gradient,
                  opacity: clampNumber(Number(style.opacity), 0, 1, 1) * (backgroundPaint?.opacity ?? 1),
                  stroke: borderColor || undefined,
                  strokeWidth: borderColor ? Math.max(1, Math.round(borderWidth * scaleX)) : undefined,
                  shadow: hasShadow ? parseCssBoxShadow(style.boxShadow, scaleY) : undefined
                });
              }
            }
          }
          for (const child of node.childNodes || []) {
            visit(child, node, nodeZIndex, semanticGroup);
          }
        };

        visit(root);
        appendMissingReferenceAssetNodes(pushNode, seenReferenceAssetIds, activeHtmlPreviewAssets.length);
        const dedupedNodes = dedupeReferenceAssetNodes(nodes);
        const stackedNodes = sortEditableNodesByStackingOrder(dedupedNodes);
        const sourceImage = getActiveResultImage()?.dataUrl
          ? {
              dataUrl: getActiveResultImage().dataUrl,
              name: "source_image_reference.png"
            }
          : null;

        return {
          version: "editable-design-experiment-0.4",
          metadata: {
            mode: "web-to-figma-capture-adapter",
            source: "h5-preview",
            nodeCount: stackedNodes.length,
            previewWidth: Math.round(rootRect.width),
            previewHeight: Math.round(rootRect.height),
            upstream: "Paidax01/web-to-figma capture.js"
          },
          screen: {
            name: "editable_design_web_to_figma_capture",
            width: targetWidth,
            height: targetHeight,
            fill: rootFill,
            gradient: rootGradient,
            clipsContent: true
          },
          sourceImage,
          nodes: stackedNodes
        };
      }

      function readCapturedZIndex(style, inheritedZIndex = 0) {
        return resolveCapturedZIndex(style, inheritedZIndex);
      }

      function getWebToFigmaElementImageUrl(node, assets) {
        const tag = String(node.tag || "").toLowerCase();
        const attrs = node.attributes || {};
        const baseHref = htmlPreviewFrame.contentWindow?.location?.href || window.location.href;
        if (tag === "img") {
          return resolveWebToFigmaAssetDataUrl(attrs.currentSrc || attrs.src || "", assets, baseHref);
        }
        const backgroundUrl = extractCssUrl(readCssBackground(node.styles));
        if (backgroundUrl) {
          return resolveWebToFigmaAssetDataUrl(backgroundUrl, assets, baseHref);
        }
        return "";
      }

      function getWebToFigmaReferenceAssetId(node, imageUrl = "") {
        const attrs = node?.attributes || {};
        const explicitId = String(
          attrs["data-reference-asset"] ||
          attrs.dataReferenceAsset ||
          attrs["data-asset-id"] ||
          attrs.dataAssetId ||
          ""
        ).trim();
        if (explicitId) {
          return explicitId;
        }
        if (!imageUrl) {
          return "";
        }
        const assetList = getActiveResultImage()?.sliceManifest?.assets || [];
        const matchedAsset = assetList.find((asset) => {
          if (!asset || asset.selected === false) {
            return false;
          }
          const assetImage = asset.svgData ? svgTextToDataUrl(asset.svgData) : asset.dataUrl;
          return assetImage && assetImage === imageUrl;
        });
        return String(matchedAsset?.id || "");
      }

      function appendMissingReferenceAssetNodes(pushNode, seenReferenceAssetIds, referenceAssetCount = 0) {
        const activeImage = getActiveResultImage();
        const assetList = activeImage?.sliceManifest?.assets || [];
        const activeIds = new Set(activeHtmlPreviewAssets.map((asset) => String(asset?.id || "")));
        for (const [assetIndex, asset] of assetList.entries()) {
          if (
            !asset?.placement
            || asset.selected === false
            || !activeIds.has(String(asset.id || ""))
            || seenReferenceAssetIds.has(String(asset.id || ""))
          ) {
            continue;
          }
          const node = createFastAuthoritativeAssetNode(
            asset,
            getSliceRadius(asset, currentManifest?.screen),
            0
          );
          if (!node) continue;
          node.name = safeLayerName(node.name);
          // A missing reference anchor has no DOM paint order. Keep it below
          // captured layers so a full-screen fallback background cannot cover them.
          if (referenceAssetCount > 0) {
            node.captureOrder = assetIndex - referenceAssetCount;
          }
          pushNode(node);
        }
      }

      async function captureHtmlPreviewAsEditableManifest({
        highFidelity = false
      } = {}) {
        const screen = currentManifest?.screen;
        if (!screen?.width || !screen?.height || !activeHtmlPreviewResult?.canonicalHtml) {
          throw new Error("The import is missing frame or HTML preview data");
        }
        await waitForHtmlPreviewReady();
        const doc = await getFastPreviewCaptureDocument(htmlPreviewFrame, screen, 5000, 25);
        const resourceWaits = [...doc.images].map((image) => image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            }));
        if (doc.fonts?.ready) resourceWaits.push(doc.fonts.ready);
        await waitForFastCaptureStep(Promise.all(resourceWaits), 1500);
        const nextPaint = new Promise((resolve) => {
          if (typeof htmlPreviewFrame.contentWindow?.requestAnimationFrame === "function") {
            htmlPreviewFrame.contentWindow.requestAnimationFrame(() => resolve());
            return;
          }
          resolve();
        });
        await waitForFastCaptureStep(nextPaint, 250);
        const cleanupCapturePseudos = highFidelity
          ? () => {}
          : materializeVisibleCapturePseudos(
            doc,
            doc.querySelector(".screen")
          );
        try {
          return await runFastVendorCapture({
            screen,
            captureRaw: () => highFidelity
              ? captureHtmlPreviewWithPlaywright(doc, screen)
              : captureHtmlPreviewWithWebToFigma(doc),
            mapCapture: (capture) => mapWebToFigmaCaptureToEditableManifest(capture, { fixedSize: true }),
            timeoutMs: highFidelity ? 15000 : 8000
          });
        } finally {
          cleanupCapturePseudos();
        }
      }

      async function requestEditableDesignHtmlPreview(signal, progressId = "", localAssets = null) {
        const activeImage = getActiveResultImage();
        if (!activeImage?.dataUrl) {
          throw new Error("There is no current design to preview");
        }
        const resolvedLocalAssets = localAssets
          || await collectEditableReferenceAssets(activeImage);
        const referenceAssets = createEditableAssetDescriptors(resolvedLocalAssets);

        const response = await fetchBackend("/api/design/reconstruct-h5", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal,
          body: JSON.stringify({
            imageDataUrl: activeImage.dataUrl,
            sourceImageName: activeImage.id || `design-${activeResultIndex + 1}.png`,
            referenceAssets,
            prompt: promptInput.value.trim() || currentManifest.sourcePrompt || "",
            width: currentManifest.screen.width,
            height: currentManifest.screen.height,
            ratio: currentRatio,
            progressId
          })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result.error || `H5 preview request failed: ${response.status}`);
        }
        if (!isSupportedHtmlPreviewResult(result)) {
          throw new Error("The local service is still running the old AI layer import; restart npm run api and try again");
        }
        return result;
      }

      async function createRepairedPreviewImage(activeImage) {
        const assets = activeImage?.sliceManifest?.assets || [];
        if (!activeImage?.dataUrl) return "";
        const displayedPreview = repairPreviewActive
          ? resultGrid.querySelector(".result-card.slice-mode .result-canvas img")?.src
          : "";
        const source = await loadImageElement(displayedPreview || activeImage.dataUrl);
        const width = source.naturalWidth || source.width;
        const height = source.naturalHeight || source.height;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(source, 0, 0);

        if (assets.length === 0) return canvas.toDataURL("image/png");

        for (const asset of assets) {
          if (!asset.repairDataUrl) {
            Object.assign(asset, await createSliceRepairPatch(activeImage.dataUrl, asset.placement));
          }
          const repair = await loadImageElement(asset.repairDataUrl);
          context.drawImage(
            repair,
            0,
            0,
            repair.naturalWidth || repair.width,
            repair.naturalHeight || repair.height,
            asset.placement.x,
            asset.placement.y,
            asset.placement.width,
            asset.placement.height
          );
        }

        return canvas.toDataURL("image/png");
      }

      async function prepareResultImages(images) {
        return Promise.all((images || []).map((image) => readResultImageMetadata(image)));
      }

      async function readResultImageMetadata(image) {
        if (!image?.dataUrl) {
          return image;
        }
        const source = await loadImageElement(image.dataUrl);
        const dimensions = validateAiImageDimensions(
          source.naturalWidth || source.width,
          source.naturalHeight || source.height
        );
        return {
          ...image,
          naturalWidth: dimensions.width,
          naturalHeight: dimensions.height
        };
      }

      async function collectEditableReferenceAssets(activeImage) {
        const assets = (activeImage?.sliceManifest?.assets || [])
          .filter((asset) => isSliceAssetIncludedForImport(asset) && asset.dataUrl && asset.placement);
        const normalized = [];
        const failures = [];
        for (const asset of assets) {
          let dataUrl = getSliceActiveImageDataUrl(asset);
          try {
            dataUrl = await ensurePngOrJpegDataUrl(dataUrl);
          } catch (error) {
            failures.push(asset.name || asset.id || "Unnamed slice");
            continue;
          }
          if (!/^data:image\/(?:png|jpeg|jpg);base64,/i.test(dataUrl)) {
            failures.push(asset.name || asset.id || "Unnamed slice");
            continue;
          }
          normalized.push({
            id: asset.id,
            name: asset.name,
            kind: asset.kind,
            type: asset.type,
            dataUrl,
            radius: getSliceRadius(asset, currentManifest?.screen),
            radii: getSliceRadii(asset, currentManifest?.screen),
            placement: asset.placement
          });
        }
        if (failures.length) {
          throw new Error(`AI layer import failed: these slices cannot be read: ${failures.join(", ")}`);
        }
        return normalized;
      }

      async function ensurePngOrJpegDataUrl(dataUrl) {
        const value = String(dataUrl || "").trim();
        if (/^data:image\/(?:png|jpeg|jpg);base64,/i.test(value)) {
          return value;
        }
        const image = await loadImageElement(value);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth || image.width || 1));
        canvas.height = Math.max(1, Math.round(image.naturalHeight || image.height || 1));
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Cannot create the image conversion canvas");
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
      }

      function loadImageElement(dataUrl) {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error("Failed to load the result image"));
          image.src = dataUrl;
        });
      }

      function isEmbeddedPluginHost() {
        return Boolean(window.parent && window.parent !== window);
      }

      async function triggerImageDownload(dataUrl, filename) {
        if (!dataUrl) {
          return;
        }
        try {
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          triggerBlobDownload(blob, filename);
        } catch (error) {
          console.error("Failed to download the image.", error);
        }
      }

      function triggerBlobDownload(blob, filename) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        link.rel = "noopener";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }

      function applyRatio(ratio) {
        const presets = {
          "1:1": [1024, 1024],
          "16:9": [1920, 1080],
          "4:3": [1600, 1200],
          "3:4": [1200, 1600],
          "9:16": [750, 1334]
        };
        if (presets[ratio]) {
          widthInput.value = presets[ratio][0];
          heightInput.value = presets[ratio][1];
        }
      }

      function updateModeVisibility() {
        const isImageToImage = currentMode === "image-to-image";
        sidebar.classList.toggle("image-mode", isImageToImage);
        referenceSection.classList.toggle("hidden", !isImageToImage);
        promptBox.classList.toggle("with-reference", isImageToImage);
        promptInput.placeholder = isImageToImage
          ? (typeof t === "function" ? t("prompt_placeholder_img2img", "Paste reference image, then enter prompt...") : "Paste reference image, then enter prompt...")
          : (typeof t === "function" ? t("prompt_placeholder", "Describe the UI app screen you want to generate") : "Describe the UI app screen you want to generate");
      }

      async function addReferenceImages(files) {
        const selectedFiles = files.filter(Boolean).slice(0, 16);
        if (selectedFiles.length === 0) {
          setStatus("Please paste or upload PNG, JPG, or WebP images.", "warning");
          return;
        }
        try {
          selectedFiles.forEach((file) => validateSupportedAiImageType(file.type));
        } catch {
          setStatus("Please paste or upload PNG, JPG, or WebP images.", "warning");
          return;
        }
        const imageFiles = selectedFiles;
        const nextImages = await Promise.all(
          imageFiles.map(async (file, index) => ({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${index}`,
            name: file.name || `reference-${referenceImages.length + index + 1}.png`,
            type: file.type || "image/png",
            dataUrl: await fileToDataUrl(file)
          }))
        );
        referenceImages = [...referenceImages, ...nextImages].slice(0, 16);
        renderReferenceImages();
        scheduleWorkspaceDraftSave();
        setStatus(`Added ${referenceImages.length} reference images; you can keep entering a prompt to generate.`, "success");
      }

      function removeReferenceImage(index) {
        referenceImages.splice(index, 1);
        renderReferenceImages();
        scheduleWorkspaceDraftSave();
      }

      function renderReferenceImages() {
        referenceSection.classList.toggle("hidden", currentMode !== "image-to-image");
        referenceDrop.classList.toggle("has-image", referenceImages.length > 0);
        referenceDrop.classList.toggle("empty", referenceImages.length === 0);
        const compactImages = referenceImages.slice(0, 4);
        const overflowCount = Math.max(referenceImages.length - compactImages.length, 0);
        referenceSection.classList.toggle("has-overflow", overflowCount > 0);
        referencePopover.hidden = overflowCount === 0;
        referenceChips.innerHTML = compactImages
          .map(
            (image, index) => `
              <span class="reference-chip">
                <img class="reference-preview" src="${image.dataUrl}" alt="${escapeHtml(image.name)}" />
                <span class="reference-info">
                  <strong>${escapeHtml(image.name)}</strong>
                </span>
                <button class="reference-clear" type="button" aria-label="Remove ${escapeHtml(image.name)}" data-remove-reference="${index}">×</button>
              </span>
            `
          )
          .join("");
        if (overflowCount > 0) {
          referenceChips.insertAdjacentHTML(
            "beforeend",
            `<span class="reference-chip more">+${overflowCount}</span>`
          );
        }
        referencePopoverGrid.innerHTML = referenceImages
          .map(
            (image, index) => `
              <span class="reference-chip">
                <img class="reference-preview" src="${image.dataUrl}" alt="${escapeHtml(image.name)}" />
                <span class="reference-info">
                  <strong>${escapeHtml(image.name)}</strong>
                </span>
                <button class="reference-clear" type="button" aria-label="Remove ${escapeHtml(image.name)}" data-remove-reference="${index}">×</button>
              </span>
            `
          )
          .join("");
      }

      function getImagesFromClipboard(clipboardData) {
        if (!clipboardData || !clipboardData.items) {
          return [];
        }
        const files = [];
        for (const item of clipboardData.items) {
          if (item.kind === "file" && item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              files.push(file);
            }
          }
        }
        return files;
      }

      async function initializeLocalService() {
        startupGate.hidden = false;
        startupGate.classList.remove("failed");
        startupRetry.hidden = true;
        startupMessage.textContent = "Checking 127.0.0.1:18787 and loading model configuration...";
        try {
          const healthResponse = await fetchAppWithTimeout(`${PROXY_BASE_URL}/health`, {}, 5000);
          if (!healthResponse.ok) throw new Error(`Local service error: ${healthResponse.status}`);
          await loadApiConfigFromBackend(true);
          startupGate.hidden = true;
          void renderWorkspaceDraftList().catch((error) => {
            console.warn("Failed to load slice records in the background: ", error);
          });
          // The main UI should not be blocked by optional history restoration.
          // Restore prompts and draft loading continue in the background.
          void offerWorkspaceDraftRestore();
        } catch (error) {
          startupGate.hidden = false;
          startupGate.classList.add("failed");
          startupRetry.hidden = false;
          startupMessage.textContent = `${readNetworkErrorMessage(error)}. Start the service, then click Reconnect.`;
        }
      }

      async function offerWorkspaceDraftRestore() {
        try {
          const draft = await readActiveWorkspaceDraft();
          if (!draft?.manifest?.resultImages?.length) return;
          pendingWorkspaceDraft = draft;
          const action = resolveWorkspaceRestoreAction(workspaceRestorePreference);
          if (action === "restore") {
            if (!canLeaveDuringAiDecomposition() || !tryStartWorkspaceOperation()) return;
            try {
              await restoreWorkspaceDraft(draft);
              pendingWorkspaceDraft = null;
            } finally {
              setWorkspaceOperationRunning(false);
            }
            return;
          }
          if (action === "new") {
            pendingWorkspaceDraft = null;
            await startNewWorkspace();
            return;
          }
          workspaceRestoreRemember.checked = false;
          workspaceRestoreDialog.classList.add("open");
        } catch (error) {
          console.warn("Failed to check unfinished work: ", error);
        }
      }

      async function persistWorkspaceRestorePreference(choice) {
        if (!workspaceRestoreRemember.checked) return;
        const saved = await saveWorkspaceRestorePreferenceApi(choice, { fetchBackend });
        if (saved) workspaceRestorePreference = choice;
      }

      async function startNewWorkspace() {
        if (!canLeaveDuringAiDecomposition()) return;
        if (!tryStartWorkspaceOperation()) return;
        try {
          if (currentManifest) await flushWorkspaceDraftChanges();
          activeWorkspaceDraftId = null;
          pendingWorkspaceDraft = null;
          await clearActiveWorkspaceDraft().catch((error) => console.warn("Failed to leave the current work: ", error));
          currentManifest = null;
          clearSliceHistory();
          activeSliceId = null;
          resetHtmlPreviewCache();
          promptInput.value = "";
          syncCharacterCount();
          sidebar.classList.remove("has-result");
          previewZoomControls.hidden = true;
          resultGrid.innerHTML = '<div class="result-card"></div>';
          resultCount.textContent = "";
          setImportActionsDisabled(true);
          renderEmptyCutModules();
          draftsPanel.classList.remove("open");
        } catch (error) {
          if (error?.name === "WorkspaceDraftSaveError") {
            setStatus(`Failed to save the slice record; cannot start a new workspace: ${error.message || String(error)}`, "error");
            return;
          }
          throw error;
        } finally {
          setWorkspaceOperationRunning(false);
        }
      }

      async function renderWorkspaceDraftList() {
        draftsList.innerHTML = '<div class="drafts-empty">Loading history records...</div>';
        try {
          const response = await fetchBackend("/api/workspace-drafts");
          const payload = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(payload.error || `HTTP ${response.status}`);
          const normalized = normalizeWorkspaceDraftListPayload(payload);
          const drafts = normalized.drafts;
          activeWorkspaceDraftId = normalized.activeDraftId;
          draftsTrigger.hidden = drafts.length === 0;
          if (drafts.length === 0) draftsPanel.classList.remove("open");
          draftsCopy.disabled = !activeWorkspaceDraftId;
          draftsList.innerHTML = renderWorkspaceDraftListHtml(drafts, activeWorkspaceDraftId);
        } catch (error) {
          draftsList.innerHTML = renderWorkspaceDraftListErrorHtml(error);
        }
      }

      async function handleWorkspaceDraftListClick(event) {
        const noteButton = event.target.closest("[data-note-draft]");
        if (noteButton) {
          await editWorkspaceDraftNote(noteButton.dataset.noteDraft, noteButton.dataset.currentNote || "");
          return;
        }
        const openButton = event.target.closest("[data-open-draft]");
        if (openButton) {
          await openWorkspaceDraft(openButton.dataset.openDraft);
          return;
        }
        const deleteButton = event.target.closest("[data-delete-draft]");
        if (!deleteButton || !canLeaveDuringAiDecomposition()) return;
        if (!tryStartWorkspaceOperation()) return;
        try {
          if (!window.confirm("Delete this slice record? It cannot be restored after deletion.")) return;
          const id = deleteButton.dataset.deleteDraft;
          const deleted = await deleteWorkspaceDraftByIdApi(id, { fetchBackend });
          if (!deleted) return;
          if (activeWorkspaceDraftId === id) {
            activeWorkspaceDraftId = null;
            currentManifest = null;
            clearSliceHistory();
            activeSliceId = null;
            resetHtmlPreviewCache();
            sidebar.classList.remove("has-result");
            previewZoomControls.hidden = true;
            resultGrid.innerHTML = "";
            resultCount.textContent = "";
            setImportActionsDisabled(true);
            renderEmptyCutModules();
          }
          await renderWorkspaceDraftList();
        } finally {
          setWorkspaceOperationRunning(false);
        }
      }

      function editWorkspaceDraftNote(id, currentNote) {
        editingWorkspaceDraftNoteId = id;
        recordNoteInput.value = currentNote;
        recordNoteDialog.classList.add("open");
        requestAnimationFrame(() => {
          recordNoteInput.focus();
          recordNoteInput.select();
        });
      }

      async function saveWorkspaceDraftNote(event) {
        event.preventDefault();
        const id = editingWorkspaceDraftNoteId;
        if (!id) return;
        try {
          await updateWorkspaceDraftNoteApi(id, recordNoteInput.value, { fetchBackend });
          closeRecordNoteDialog();
          await renderWorkspaceDraftList();
        } catch (error) {
          setStatus(`Failed to save the slice record note: ${error.message || String(error)}`, "error");
        }
      }

      async function openWorkspaceDraft(id) {
        if (!canLeaveDuringAiDecomposition()) return;
        if (!id || id === activeWorkspaceDraftId) {
          draftsPanel.classList.remove("open");
          return;
        }
        if (!tryStartWorkspaceOperation()) return;
        setDraftsLoading(true, "Switching slice record…");
        try {
          await flushWorkspaceDraftChanges();
          const item = await loadWorkspaceDraftItemApi(id, { fetchBackend });
          activeWorkspaceDraftId = item.id;
          await restoreWorkspaceDraft(item.draft);
          draftsPanel.classList.remove("open");
        } catch (error) {
          if (error?.name === "WorkspaceDraftSaveError") {
            setStatus(`Failed to save the slice record; cannot switch records: ${error.message || String(error)}`, "error");
            return;
          }
          setStatus(`Failed to switch slice record: ${error.message || String(error)}`, "error");
        } finally {
          setDraftsLoading(false);
          setWorkspaceOperationRunning(false);
        }
      }

      async function duplicateActiveWorkspaceDraft() {
        if (!canLeaveDuringAiDecomposition() || !activeWorkspaceDraftId) return;
        if (!tryStartWorkspaceOperation()) return;
        setDraftsLoading(true, "Creating a copy…");
        try {
          await flushWorkspaceDraftChanges();
          const item = await duplicateWorkspaceDraftApi(activeWorkspaceDraftId, { fetchBackend });
          activeWorkspaceDraftId = item.id;
          await restoreWorkspaceDraft(item.draft);
          await renderWorkspaceDraftList();
        } catch (error) {
          if (error?.name === "WorkspaceDraftSaveError") {
            setStatus(`Failed to save the slice record; cannot create a copy: ${error.message || String(error)}`, "error");
            return;
          }
          setStatus(`Failed to create a slice record copy: ${error.message || String(error)}`, "error");
        } finally {
          setDraftsLoading(false);
          setWorkspaceOperationRunning(false);
        }
      }

      async function flushWorkspaceDraftChanges() {
        clearTimeout(workspaceDraftSaveTimer);
        if (workspaceDraftDirty) {
          requireSuccessfulWorkspaceDraftSave(await saveWorkspaceDraft());
          return;
        }
        await workspaceDraftWritePromise;
      }

      function setDraftsLoading(loading, message = "Processing slice record…") {
        draftsPanel.classList.toggle("loading", loading);
        draftsPanel.style.setProperty("--draft-loading-message", `"${message}"`);
        draftsCopy.disabled = loading || !activeWorkspaceDraftId;
      }

      async function restoreWorkspaceDraft(draft) {
        isRestoringWorkspaceDraft = true;
        try {
          validateAiImageDimensions(
            draft.manifest?.screen?.width,
            draft.manifest?.screen?.height
          );
          currentManifest = structuredClone(draft.manifest);
          currentMode = draft.currentMode || "text-to-image";
          currentRatio = draft.currentRatio || "9:16";
          currentStyle = draft.currentStyle || "";
          widthInput.value = Math.round(clampNumber(Number(draft.width), 256, 4096, currentManifest.screen?.width || 750));
          heightInput.value = Math.round(clampNumber(Number(draft.height), 256, 4096, currentManifest.screen?.height || 1334));
          promptInput.value = String(draft.prompt || currentManifest.sourcePrompt || "");
          referenceImages = Array.isArray(draft.referenceImages) ? structuredClone(draft.referenceImages) : [];
          htmlPreviewCache = normalizeHtmlPreviewCache(structuredClone(draft));
          activeHtmlPreviewResult = null;
          activeHtmlPreviewAssets = [];
          document.querySelectorAll("[data-mode]").forEach((button) => {
            button.classList.toggle("active", button.dataset.mode === currentMode);
          });
          document.querySelectorAll("[data-ratio]").forEach((button) => {
            button.classList.toggle("active", button.dataset.ratio === currentRatio);
          });
          const customSizeLabel = document.querySelector('[data-ratio="custom"] .choice-size');
          if (customSizeLabel && currentRatio === "custom") {
            customSizeLabel.textContent = `${widthInput.value}px × ${heightInput.value}px`;
          }
          syncCharacterCount();
          updateModeVisibility();
          renderReferenceImages();
          renderResults(currentManifest, {
            resultIndex: draft.activeResultIndex,
            sliceId: draft.activeSliceId || null
          });
          renderCutModules(currentManifest);
          clearSliceHistory();
          setImportActionsDisabled(false);
        } finally {
          isRestoringWorkspaceDraft = false;
          workspaceDraftDirty = false;
        }
      }

      async function fetchAppWithTimeout(url, options = {}, timeoutMs = 5000) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        try {
          return await fetch(url, { ...options, signal: controller.signal });
        } finally {
          clearTimeout(timeout);
        }
      }

      function showLocalServiceDisconnected(error) {
        startupGate.hidden = false;
        startupGate.classList.add("failed");
        startupRetry.hidden = false;
        startupMessage.textContent = "The local service has disconnected. Start npm run api, then click Reconnect.";
        console.warn("Local service disconnected:", error);
      }

      const backendClient = createBackendClient({ onDisconnected: showLocalServiceDisconnected });
      const ensureLocalServiceConnected = backendClient.ensureLocalServiceConnected;
      const fetchBackend = backendClient.fetchBackend;

      async function loadApiConfigFromBackend(throwOnError = false) {
        try {
          const response = await fetchAppWithTimeout(`${PROXY_BASE_URL}/api/model-configs`, {}, 5000);
          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(readErrorMessage(data, `Failed to load config: ${response.status}`));
          }
          modelConfigState = normalizeModelConfigPayload(data);
          renderModelSettings();
        } catch (error) {
          console.warn("Failed to load API config from backend:", error);
          if (throwOnError) throw error;
        }
      }

      function renderModelSettings() {
        taskRoutingView.innerHTML = renderTaskRoutingView(modelConfigState);
        modelConfigList.innerHTML = renderModelConfigListView(modelConfigState);
      }

      function findModelConfig(configId) {
        return modelConfigState.modelConfigs.find((config) => config.id === configId) || null;
      }

      function openModelConfigEditor(config = null) {
        const defaults = getModelPurposeDefaults("vision");
        modelConfigIdInput.value = config?.id || "";
        modelConfigNameInput.value = config?.name || "";
        modelConfigBaseUrlInput.value = config?.baseUrl || "https://api.openai.com";
        modelConfigModelInput.value = config?.model || defaults.model;
        modelConfigTimeoutInput.value = config?.timeoutSeconds || defaults.timeoutSeconds;
        modelConfigApiKeyInput.value = "";
        modelConfigApiKeyInput.placeholder = config?.hasApiKey
          ? "*".repeat(config.apiKeyLength || 8)
          : "sk-...";
        const purpose = config?.tasks?.includes("vision") ? "vision" : (config ? "image" : defaults.purpose);
        editingModelConfigPurpose = purpose;
        editingModelConfigWasRouted = Boolean(config && isModelConfigRouted(config.id));
        modelConfigPurposeInputs.forEach((input) => {
          input.checked = input.value === purpose;
        });
        modelConfigDeleteButton.hidden = !config;
        applyModelConfigTestButtonState(modelConfigTestButton, config);
        closeEditedModelConfigOptions();
        modelConfigApiKeyChanged = false;
        revealedModelConfigKey = false;
        modelConfigApiKeyInput.type = "password";
        modelConfigRevealKeyButton.textContent = typeof t === "function" ? t("btn_show_key", "Show") : "Show";
        modelConfigDialogTitle.textContent = config
          ? (typeof t === "function" ? t("dialog_edit_api", "Edit Model API") : "Edit Model API")
          : (typeof t === "function" ? t("dialog_new_api", "New Model API") : "New Model API");
        updateModelConfigSubmitCopy();
        modelConfigDialog.classList.add("open");
        modelConfigDialog.setAttribute("aria-hidden", "false");
        modelConfigNameInput.focus();
      }

      function closeModelConfigEditor() {
        modelConfigDialog.classList.remove("open");
        modelConfigDialog.setAttribute("aria-hidden", "true");
        modelConfigIdInput.value = "";
        modelConfigApiKeyInput.value = "";
        modelConfigApiKeyChanged = false;
        revealedModelConfigKey = false;
        closeEditedModelConfigOptions();
      }

      function clearTransientModelConfigTestResults() {
        modelConfigState = {
          ...modelConfigState,
          modelConfigs: modelConfigState.modelConfigs.map((config) => ({
            ...config,
            testResults: {}
          }))
        };
      }

      function clearModelConfigStatus() {
        apiConfigStatus.classList.remove("error");
        apiConfigStatus.textContent = "";
      }

      function isModelConfigRouted(configId) {
        return Object.values(modelConfigState.taskRouting).includes(configId);
      }

      function updateModelConfigSubmitCopy() {
        const submit = modelConfigForm.querySelector('[type="submit"]');
        if (!modelConfigIdInput.value) {
          submit.textContent = typeof t === "function" ? t("btn_save_apply", "Save and set as current") : "Save and set as current";
        } else if (editingModelConfigWasRouted) {
          submit.textContent = typeof t === "function" ? t("btn_save_apply", "Save and apply now") : "Save and apply now";
        } else {
          submit.textContent = typeof t === "function" ? t("btn_save_changes", "Save") : "Save";
        }
      }

      function closeModelRoutePickers(exceptTask = "") {
        taskRoutingView.querySelectorAll("[data-route-picker-menu]").forEach((menu) => {
          if (menu.dataset.routePickerMenu === exceptTask) return;
          menu.hidden = true;
          const trigger = taskRoutingView.querySelector(
            `[data-route-picker-trigger="${menu.dataset.routePickerMenu}"]`
          );
          if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
      }

      function toggleModelRoutePicker(task, focusOption = false) {
        const menu = taskRoutingView.querySelector(`[data-route-picker-menu="${task}"]`);
        const trigger = taskRoutingView.querySelector(`[data-route-picker-trigger="${task}"]`);
        if (!menu || !trigger) return;
        const opening = menu.hidden;
        closeModelRoutePickers(opening ? task : "");
        menu.hidden = !opening;
        trigger.setAttribute("aria-expanded", String(opening));
        if (opening && focusOption) {
          (menu.querySelector('[aria-selected="true"]') || menu.querySelector("[data-route-picker-option]"))?.focus();
        }
      }

      function handleModelRoutePickerKeydown(event) {
        const trigger = event.target.closest("[data-route-picker-trigger]");
        if (trigger && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          toggleModelRoutePicker(trigger.dataset.routePickerTrigger, true);
          return;
        }
        const option = event.target.closest("[data-route-picker-option]");
        if (!option) return;
        const menu = option.closest("[data-route-picker-menu]");
        const options = [...menu.querySelectorAll("[data-route-picker-option]")];
        if (event.key === "Escape") {
          event.preventDefault();
          const task = menu.dataset.routePickerMenu;
          closeModelRoutePickers();
          taskRoutingView.querySelector(`[data-route-picker-trigger="${task}"]`)?.focus();
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          option.click();
          return;
        }
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
        event.preventDefault();
        const offset = event.key === "ArrowDown" ? 1 : -1;
        options[(options.indexOf(option) + offset + options.length) % options.length]?.focus();
      }

      async function saveTaskRouteSelection({ task, configId, restore = true }) {
        const previousConfigId = getSavedTaskRouteValue(modelConfigState, task);
        if (configId === previousConfigId) return true;
        const trigger = taskRoutingView.querySelector(`[data-route-picker-trigger="${task}"]`);
        if (trigger) trigger.disabled = true;
        apiConfigStatus.classList.remove("error");
        apiConfigStatus.textContent = "Saving…";
        try {
          const response = await fetchBackend(`/api/task-routing/${encodeURIComponent(task)}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ configId })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(readErrorMessage(data, `Switch failed: ${response.status}`));
          modelConfigState = applyTaskRouteSaveSuccess(modelConfigState, task, configId);
          renderModelSettings();
          apiConfigStatus.textContent = "Switched and applied now";
          return true;
        } catch (error) {
          if (restore) renderModelSettings();
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = readNetworkErrorMessage(error);
          return false;
        } finally {
          const current = taskRoutingView.querySelector(`[data-route-picker-trigger="${task}"]`);
          if (current) current.disabled = false;
        }
      }

      async function saveModelConfigEditor(event) {
        event.preventDefault();
        const purpose = modelConfigPurposeInputs.find((input) => input.checked)?.value;
        if (!purpose) {
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = "Select a model purpose";
          return;
        }
        const configId = modelConfigIdInput.value;
        const requestBody = buildModelConfigSaveRequest({
          name: modelConfigNameInput.value,
          baseUrl: modelConfigBaseUrlInput.value,
          model: modelConfigModelInput.value,
          timeoutSeconds: modelConfigTimeoutInput.value,
          purpose,
          apiKey: modelConfigApiKeyInput.value,
          apiKeyChanged: modelConfigApiKeyChanged
        });
        const submit = modelConfigForm.querySelector('[type="submit"]');
        submit.disabled = true;
        apiConfigStatus.classList.remove("error");
        apiConfigStatus.textContent = "Saving…";
        try {
          const response = await fetchBackend(
            configId ? `/api/model-configs/${encodeURIComponent(configId)}` : "/api/model-configs",
            {
              method: configId ? "PUT" : "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(requestBody)
            }
          );
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(readErrorMessage(data, `Save failed: ${response.status}`));
          const savedConfigId = data.config?.id || configId;
          const purposeTask = purpose === "vision" ? "vision" : "generation";
          const purposeChanged = Boolean(
            configId && !findModelConfig(configId)?.tasks.includes(purposeTask)
          );
          const shouldRoute = !configId || (editingModelConfigWasRouted && purposeChanged);
          let routeSaved = true;
          if (shouldRoute) {
            routeSaved = await saveTaskRouteSelection({
              task: purpose,
              configId: savedConfigId,
              restore: false
            });
          }
          await loadApiConfigFromBackend(true);
          closeModelConfigEditor();
          if (routeSaved) {
            apiConfigStatus.textContent = shouldRoute || editingModelConfigWasRouted
              ? "Saved and applied now"
              : "Saved";
          }
        } catch (error) {
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = readNetworkErrorMessage(error);
        } finally {
          submit.disabled = false;
        }
      }

      async function handleModelConfigListAction(event) {
        const testButton = event.target.closest("[data-model-config-test]");
        if (testButton) {
          await testModelConfigCard(testButton.dataset.modelConfigTest, testButton);
          return;
        }
        const editButton = event.target.closest("[data-model-config-edit]");
        if (editButton) openModelConfigEditor(findModelConfig(editButton.dataset.modelConfigEdit));
      }

      async function testModelConfigCard(configId, button) {
        button.disabled = true;
        button.textContent = "Testing";
        button.classList.remove("success", "failure");
        apiConfigStatus.classList.remove("error");
        apiConfigStatus.textContent = "Testing config…";
        try {
          const response = await fetchBackend(`/api/model-configs/${encodeURIComponent(configId)}/test`, {
            method: "POST"
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(readErrorMessage(data, `Test failed: ${response.status}`));
          const index = modelConfigState.modelConfigs.findIndex((config) => config.id === configId);
          if (index >= 0 && data.config) modelConfigState.modelConfigs[index] = data.config;
          renderModelSettings();
          applyModelConfigTestButtonState(button, data.config);
          const failures = Object.values(data.config?.testResults || {})
            .filter((result) => result.status === "failed")
            .map((result) => result.error);
          apiConfigStatus.classList.toggle("error", failures.length > 0);
          apiConfigStatus.textContent = failures.length ? failures.join("; ") : "Test complete";
        } catch (error) {
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = readNetworkErrorMessage(error);
          button.textContent = "Test Failed";
          button.classList.add("failure");
        } finally {
          if (button.isConnected) {
            button.disabled = false;
          }
        }
      }

      function applyModelConfigTestButtonState(button, config) {
        const state = config ? getModelConfigTestButtonState(config) : { text: "Test", tone: "neutral" };
        button.textContent = state.text;
        button.classList.remove("success", "failure");
        if (state.tone !== "neutral") button.classList.add(state.tone);
      }

      function buildEditedModelConfigPreviewRequest() {
        const purpose = modelConfigPurposeInputs.find((input) => input.checked)?.value;
        return {
          configId: modelConfigIdInput.value,
          ...buildModelConfigSaveRequest({
            name: modelConfigNameInput.value,
            baseUrl: modelConfigBaseUrlInput.value,
            model: modelConfigModelInput.value,
            timeoutSeconds: modelConfigTimeoutInput.value,
            purpose,
            apiKey: modelConfigApiKeyInput.value,
            apiKeyChanged: modelConfigApiKeyChanged
          })
        };
      }

      async function testEditedModelConfig() {
        const button = modelConfigTestButton;
        button.disabled = true;
        button.textContent = "Testing";
        button.classList.remove("success", "failure");
        apiConfigStatus.classList.remove("error");
        apiConfigStatus.textContent = "Testing config…";
        try {
          const response = await fetchBackend("/api/model-configs/preview/test", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(buildEditedModelConfigPreviewRequest())
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(readErrorMessage(data, `Test failed: ${response.status}`));
          applyModelConfigTestButtonState(button, data.config);
          const failures = Object.values(data.config?.testResults || {})
            .filter((result) => result.status === "failed")
            .map((result) => result.error);
          apiConfigStatus.classList.toggle("error", failures.length > 0);
          apiConfigStatus.textContent = failures.length ? failures.join("; ") : "Test complete";
        } catch (error) {
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = readNetworkErrorMessage(error);
          button.textContent = "Test Failed";
          button.classList.add("failure");
        } finally {
          button.disabled = false;
        }
      }

      async function deleteEditedModelConfig() {
        const configId = modelConfigIdInput.value;
        if (!configId) return;
        const taskLabels = {
          vision: "Vision Model",
          generation: "Image generation",
          inpaint: "Image inpainting"
        };
        const affectedTasks = Object.entries(modelConfigState.taskRouting)
          .filter(([, selectedConfigId]) => selectedConfigId === configId)
          .map(([task]) => taskLabels[task])
          .filter(Boolean);
        const confirmation = affectedTasks.length
          ? `Delete this model API? The following will be cleared: ${affectedTasks.join(", ")}.`
          : "Delete this model API?";
        if (!window.confirm(confirmation)) return;
        modelConfigDeleteButton.disabled = true;
        try {
          const response = await fetchBackend(`/api/model-configs/${encodeURIComponent(configId)}`, {
            method: "DELETE"
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(readErrorMessage(data, `Delete failed: ${response.status}`));
          modelConfigState = normalizeModelConfigPayload({
            modelConfigs: modelConfigState.modelConfigs.filter((config) => config.id !== configId),
            taskRouting: data.taskRouting || modelConfigState.taskRouting
          });
          renderModelSettings();
          closeModelConfigEditor();
          apiConfigStatus.classList.remove("error");
          apiConfigStatus.textContent = "Config deleted";
        } catch (error) {
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = readNetworkErrorMessage(error);
        } finally {
          modelConfigDeleteButton.disabled = false;
        }
      }

      async function toggleEditedModelConfigKey() {
        if (modelConfigApiKeyInput.type === "text") {
          modelConfigApiKeyInput.type = "password";
          if (revealedModelConfigKey) modelConfigApiKeyInput.value = "";
          revealedModelConfigKey = false;
          modelConfigRevealKeyButton.textContent = typeof t === "function" ? t("btn_show_key", "Show") : "Show";
          return;
        }
        const configId = modelConfigIdInput.value;
        try {
          if (!modelConfigApiKeyInput.value && configId && findModelConfig(configId)?.hasApiKey) {
            const response = await fetchBackend(`/api/model-configs/${encodeURIComponent(configId)}/reveal-key`, {
              method: "POST"
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(readErrorMessage(data, `Failed to load: ${response.status}`));
            modelConfigApiKeyInput.value = data.apiKey;
            revealedModelConfigKey = true;
          }
          modelConfigApiKeyInput.type = "text";
          modelConfigRevealKeyButton.textContent = typeof t === "function" ? t("btn_hide_key", "Hide") : "Hide";
        } catch (error) {
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = readNetworkErrorMessage(error);
        }
      }

      async function downloadEditedModelConfigModels() {
        modelConfigModelsButton.disabled = true;
        try {
          const response = await fetchBackend("/api/model-configs/preview/models", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(buildEditedModelConfigPreviewRequest())
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(readErrorMessage(data, `Failed to fetch models: ${response.status}`));
          renderEditedModelConfigOptions(data.models || []);
          apiConfigStatus.classList.remove("error");
          apiConfigStatus.textContent = data.models?.length
            ? `Fetched ${data.models.length} models`
            : "The endpoint returned no available models";
        } catch (error) {
          apiConfigStatus.classList.add("error");
          apiConfigStatus.textContent = readNetworkErrorMessage(error);
        } finally {
          modelConfigModelsButton.disabled = false;
        }
      }

      function renderEditedModelConfigOptions(models) {
        modelConfigModelMenu.innerHTML = models
          .map((model) => `<button type="button" role="option" data-model-option="${escapeHtml(model)}">${escapeHtml(model)}</button>`)
          .join("");
        modelConfigModelMenu.hidden = models.length === 0;
        modelConfigModelInput.setAttribute("aria-expanded", String(models.length > 0));
      }

      function closeEditedModelConfigOptions() {
        modelConfigModelMenu.hidden = true;
        modelConfigModelInput.setAttribute("aria-expanded", "false");
      }

      function syncCharacterCount() {
        charCount.textContent = `${promptInput.value.length} / 1000`;
      }

      function syncGlobalLoadingState() {
        const specializedLoading = editablePreviewLoadingDialog.classList.contains("open")
          && editablePreviewLoadingDialog.dataset.state !== "error"
          || backgroundDecompositionLoadingDialog.classList.contains("open");
        const loading = uiBusy || specializedLoading;
        document.body.classList.toggle("loading-interaction-locked", loading);
        globalLoadingDialog.classList.toggle("open", uiBusy && !specializedLoading);
        globalLoadingDialog.setAttribute("aria-hidden", String(!(uiBusy && !specializedLoading)));
        globalLoadingTitle.textContent = busyStatusMessage || (typeof t === "function" ? t("loading_processing", "Processing...") : "Processing...");
      }

      function setBusy(isBusy, message) {
        uiBusy = isBusy;
        updateImageToCodeButtonState();
        updateFigmaFrameHtmlExportButtonState();
        generateButton.disabled = isBusy;
        generateButton.textContent = isBusy
          ? (typeof t === "function" ? t("loading_processing", "Generating...") : "Generating...")
          : (typeof t === "function" ? t("btn_ai_generate", "Generate UI") : "Generate UI");
        if (message) {
          busyStatusMessage = message;
        }
        if (!isBusy) {
          busyStatusMessage = "";
        }
        syncGlobalLoadingState();
      }

      function releaseBusyIfIdle() {
        if (hasRunningSliceAiTasks() || figmaImportPending || figmaFrameHtmlExportPending) {
          return false;
        }
        setBusy(false);
        return true;
      }

      function resetHtmlPreviewCache() {
        if (editablePreviewController) {
          editablePreviewController.abort();
          editablePreviewController = null;
          editablePreviewProgressId = "";
          closeEditablePreviewLoadingDialog();
        }
        activeEditablePreviewRequestId = 0;
        htmlPreviewCache = createEmptyHtmlPreviewCache();
        activeHtmlPreviewResult = null;
        activeHtmlPreviewAssets = [];
      }

      function updateFigmaFrameHtmlExportButtonState() {
        const buttonState = getFigmaFrameHtmlExportButtonState({
          embedded: isEmbeddedPluginHost(),
          selectionEligible: figmaFrameHtmlExportSelectionEligible,
          selectionReason: figmaFrameHtmlExportSelectionReason,
          uiBusy,
          figmaImportPending,
          figmaFrameHtmlExportPending
        });
        exportFigmaFrameHtmlButton.disabled = buttonState.disabled;
        exportFigmaFrameHtmlButton.setAttribute("aria-disabled", String(buttonState.ariaDisabled));
        exportFigmaFrameHtmlButton.title = buttonState.title;
      }

      function hideStatus() {
        clearTimeout(statusHideTimer);
        statusHideTimer = null;
        status.classList.remove("show");
      }

      function setStatus(message, type = "info") {
        if (!message) {
          return;
        }
        const policy = getStatusPolicy(type);
        clearTimeout(statusHideTimer);
        statusHideTimer = null;
        statusMessage.textContent = message;
        status.classList.remove("success", "info", "warning", "error");
        status.classList.add(policy.type);
        status.setAttribute("role", policy.type === "error" ? "alert" : "status");
        statusClose.hidden = false;
        status.classList.add("show");
        if (!policy.persistent) {
          statusHideTimer = setTimeout(hideStatus, policy.duration);
        }
      }

      function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error || new Error("Failed to read the image"));
          reader.readAsDataURL(file);
        });
      }
