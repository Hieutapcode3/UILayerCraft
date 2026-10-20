const I18N_STORAGE_KEY = "uilayercraft_language";
const DEFAULT_LANGUAGE = "en-US";

const I18N_TRANSLATIONS = {
  "en-US": {
    // Startup
    "startup_title": "Connecting to Local Service",
    "startup_message": "Checking 127.0.0.1:18787 and loading model configuration...",
    "startup_retry": "Reconnect",

    // Topbar
    "brand_title": "UILayerCraft",
    "ai_slice": "AI Slice",
    "ai_slice_help": "Identify regular PNG slices and full key visual backgrounds in one go; regular slices are added directly to canvas, and backgrounds are generated after confirming boundaries",
    "zoom_out": "Zoom Out",
    "zoom_reset": "Reset to 100%",
    "zoom_in": "Zoom In",
    "zoom_fit": "Fit to Screen",
    "canvas_zoom": "Canvas Zoom",
    "slice_import": "Import Slices",
    "slice_import_help": "Import current background and slice assets directly into Figma",
    "slice_import_fig_web": "Download Slices .fig",
    "slice_import_fig_web_help": "Package background and slice assets into a .fig file by original coordinates. Can be opened or imported directly into Figma",
    "ai_layer_import": "AI Layer Import",
    "ai_layer_import_help": 'After confirming slices, AI analyzes text, layout, and slice assets on canvas to import as editable layers. Accuracy depends on the "Vision Model" in Settings',
    "export_figma_frame_html": "Export HTML",
    "export_figma_frame_html_hint": "Please select a complete frame in Figma",
    "window_toggle_collapse": "Collapse Window",
    "window_toggle_expand": "Expand Window",
    "step_load": "Load Image",
    "step_slice": "Slice",
    "step_export": "Export",

    // Language
    "language": "Language",
    "lang_en": "🇬🇧 English",
    "lang_vi": "🇻🇳 Tiếng Việt",

    // Modes
    "mode_text_to_image": "Text to Image",
    "mode_image_to_image": "Image to Image",
    "step_1_prompt": "1. Enter Prompt",
    "prompt_placeholder": "Enter prompt for image generation, up to 1000 characters...",
    "upload_ref_headline": "Paste image or click to upload",
    "upload_ref_subtext": "Supports uploading multiple reference images or pasting them consecutively",
    "step_2_ratio": "2. Aspect Ratio",
    "ratio_square": "Square",
    "ratio_landscape": "Landscape",
    "ratio_traditional": "Traditional",
    "ratio_portrait": "Portrait",
    "ratio_phone": "Mobile",
    "ratio_custom": "Custom",
    "ratio_custom_hint": "Enter custom dimensions",
    "btn_ai_generate": "Generate UI",
    "or_separator": "or",
    "btn_local_image": "Local Image",

    // Slice Panel
    "cut_title": "Slice Assets",
    "export_slices": "Export Slices",
    "transparent_all": "All Transparent",
    "toggle_all_slices_hide": "Hide All",
    "toggle_all_slices_show": "Show All",
    "repair_preview": "Preview Inpaint",
    "settings_trigger": "Settings",
    "new_work_trigger": "New Project",
    "drafts_trigger": "History",
    "drafts_head": "History",
    "drafts_copy": "Duplicate",
    "drafts_close": "Close History",

    // Settings Panel
    "settings_title": "Model Settings",
    "btn_new_api": "+ New API",
    "settings_close": "Close Settings",
    "section_current_use": "Active Routing",
    "section_current_use_hint": "Saves and applies immediately upon switching",
    "section_model_api": "Model APIs",
    "section_model_api_hint": "Create multiple connections and assign by purpose",
    "section_language": "Interface Language",
    "section_language_hint": "Select the UI display language",
    "task_vision": "Vision Model",
    "task_vision_hint": "AI slicing, AI layer import, and SVG understanding",
    "task_vision_help": "Calls POST /v1/chat/completions. The model must support image input.",
    "task_image": "Image Generation / Inpaint",
    "task_image_hint": "Text-to-image, transparency, background restoration, and local inpaint",
    "task_image_help": "Image generation calls POST /v1/images/generations; Image inpainting calls POST /v1/images/edits, prioritizing standalone masks with fallback to semantic reference images.",
    "select_config": "Select configuration",
    "not_configured": "Not configured",
    "no_available_api": "No API available",
    "no_model_config": "No model configurations yet",
    "unnamed_api": "Unnamed API",
    "test_passed": "Test Passed",
    "test_failed": "Test Failed",
    "test_neutral": "Test",
    "mask_supported": "Mask Supported",
    "mask_unsupported": "Mask Unsupported",
    "active_use_prefix": "Active for ",
    "btn_edit": "Edit",
    "seconds_unit": "s",

    // Model Config Dialog
    "dialog_new_api": "New Model API",
    "dialog_edit_api": "Edit Model API",
    "close_api_edit": "Close API Editor",
    "form_name": "Note / Name (Optional)",
    "form_name_placeholder": "e.g.: Official OpenAI",
    "form_base_url": "Base URL",
    "form_model": "Model",
    "btn_fetch_models": "Fetch Models",
    "form_timeout": "Timeout (seconds)",
    "form_api_key": "API Key",
    "btn_show_key": "Show",
    "btn_hide_key": "Hide",
    "legend_purpose": "Purpose",
    "btn_delete": "Delete",
    "btn_test": "Test",
    "btn_save_apply": "Save & Apply",

    // Slice Editor
    "slice_editor_title": "Edit Slice",
    "slice_editor_aria": "Slice Editor",
    "tool_brush": "Brush",
    "tool_eraser": "Eraser",
    "tool_thickness": "Size",
    "btn_ai_complete": "AI Inpaint",
    "btn_cancel_ai": "Cancel AI Inpaint",
    "btn_save_to_slice": "Save to Slice",
    "unsaved_title": "Save Changes?",
    "unsaved_desc": "This slice contains unsaved image modifications.",
    "btn_discard": "Don't Save",
    "btn_save_changes": "Save Changes",
    "slice_settings_kicker": "Slice Settings",
    "close_slice_settings": "Close Slice Settings",

    // Workspace & Restore
    "restore_work_title": "Unfinished Work Found",
    "restore_work_desc": "Restore previous images, slice assets, and AI layer preview.",
    "restore_remember": "Don't remind again",
    "btn_start_new_work": "Start New",
    "btn_restore_work": "Restore Previous Work",
    "custom_size_title": "Custom Size",
    "custom_size_width": "Width",
    "custom_size_height": "Height",
    "custom_size_hint": "Supports 256–4096px",
    "record_note_title": "Edit Note",
    "record_note_placeholder": "Enter a title for yourself",
    "btn_cancel": "Cancel",
    "btn_confirm": "Confirm",

    // Background Decomposition
    "bg_confirm_title": "Select Background to Restore",
    "bg_confirm_desc": "Blue box is the full background; red boxes will be removed from the background. Stylized text, illustrations, and integrated branding are preserved by default.",
    "btn_regenerate_ai": "Re-analyze with AI",
    "btn_generate_full_bg": "Generate Full Background",
    "bg_zoom_aria": "Canvas Zoom",

    // AI Layer Preview & Inspector
    "ai_preview_title": "AI Layer Import Preview",
    "preview_zoom_aria": "Preview Zoom",
    "btn_download_html": "Download HTML",
    "btn_import_figma": "Import Design to Figma",
    "btn_download_fig": "Download Design .fig",
    "import_settings": "Import Settings",
    "high_fidelity_capture": "High-fidelity capture (Playwright/CDP)",
    "high_fidelity_desc": "Completes pseudo-elements, filters, clipping, and complex backgrounds.",
    "inspector_aria": "Layout Inspector",
    "inspector_elements": "Elements",
    "inspector_elements_hint": "Select to delete generated elements",
    "inspector_waiting": "Waiting for preview content",
    "inspector_layout": "Layout",
    "inspector_select_element": "Select an element to view layout",
    "resize_inspector_width": "Resize Inspector Width",

    // Loading Dialogs
    "loading_processing": "Processing...",
    "loading_ai_layer": "Importing AI Layers",
    "loading_ai_layer_desc": "Preparing to request vision model to analyze text, layout, and slice assets…",
    "loading_ai_decomp": "AI Slicing in Progress",
    "loading_ai_decomp_desc": "Identifying regular slices, full background, and overlay elements…",
    "elapsed_time": "Elapsed: {seconds}s",
    "btn_retry": "Retry",

    // Status & Prompts
    "status_close": "Close Notification",
    "window_resizer": "Drag to resize window",
    "prompt_placeholder_img2img": "Paste reference image, then enter prompt...",
    "editable_title_embedded": "Capture current preview as Figma editable layers",
    "no_slice_area": "No slice areas yet",
    "empty_drafts": "No history records yet",
    "reading_drafts": "Loading history records...",
    "multi_values": "Multiple values",
    "apply_to_all": "Enter to apply to all",
    "selected_slices_count": "{count} slices selected",
    "fill_prompt_warning": "Please enter a prompt first.",
    "upload_image_warning": "Please paste or upload PNG, JPG, or WebP images.",
    "btn_reconnect": "Reconnect",
    "btn_exit_preview": "Exit Inpaint Preview",

    // Dynamic status messages (app.js / state files)
    "status_repair_preview_generating": "Generating inpaint preview...",
    "status_repair_preview_failed": "Failed to generate inpaint preview: {error}",
    "status_image_generating": "Requesting image model to generate image…",
    "status_generate_failed": "Generation failed: {error}",
    "status_draft_save_failed_keep": "History save failed, current workspace preserved: {error}",
    "status_draft_save_failed": "History save failed: {message}",
    "status_local_image_reading": "Reading local image…",
    "status_local_image_failed": "Failed to read local image: {error}",
    "status_no_vision_model": "Please configure a Vision model in Settings",
    "status_no_figma_canvas": "Please select a Figma canvas first",
    "status_figma_frame_select_first": "Please select a complete frame in the Figma plugin before exporting.",
    "status_figma_frame_reading": "Reading Figma frame and generating HTML…",
    "status_figma_frame_timeout": "Figma frame HTML export timed out. Please retry.",
    "status_figma_frame_failed": "Figma frame HTML export failed: {error}",
    "status_imported_to_figma": "Source imported to Figma.",
    "status_cancelling": "Cancelling...",
    "status_image_count_mismatch": "Requested {requested} images, received {received}.",
    "status_image_generated": "Image generated. {note}",
    "status_image_mock": "Backend not connected or API key missing — mock resource used.",
    "status_image_provider_note": "Model: {model} · Requested size: {size} · Returned size: {returnedSize}",
    "status_local_image_type": "Please select a PNG, JPG, or WebP image.",
    "status_ai_repair_kept": "AI full image kept; a pre-repair copy was created for repositioning",
    "status_update_crop_failed": "Failed to update slice crop: {error}",
    "status_figma_import_timeout": "Figma import has not reported progress for {seconds}s and has been stopped. Please check Figma status and retry.",
    "status_importing_layers": "Importing {processed} / {total} layers…",
    "status_import_done": "{count} layers imported, {warnings}",
    "status_html_download_started": "HTML download started.",
    "status_html_download_warnings": "HTML download started, {count} properties or assets skipped.",
    "status_html_export_failed": "Figma frame HTML export failed: {error}",
    "status_layers_skipped": "{count} unsupported layers not imported",
    "status_groups_failed": "{count} components not grouped",

    // Slice AI state messages
    "slice_asset_default_name": "Slice asset",
    "slice_reset_transparent_svg": "\"{name}\" has been made transparent and converted to SVG. Adjusting the slice will undo transparency and SVG. Continue?",
    "slice_reset_transparent": "\"{name}\" has been made transparent. Adjusting the slice will undo transparency. Continue?",
    "slice_reset_svg": "\"{name}\" has been converted to SVG. Adjusting the slice will undo SVG. Continue?",
    "slice_reset_processed": "\"{name}\" has been processed. Adjusting the slice will undo processing. Continue?",

    // HTML preview cache messages
    "cache_stale_warning": "Slice assets have changed. Click \"Re-analyze with AI\" to update the preview.",
    "cache_missing_slices": "Cached slices no longer exist, re-analyzing with AI.",
    "cache_open_failed": "AI layer import cache could not be opened",

    // Figma frame export messages
    "figma_select_canvas_first": "Please select a Figma canvas first",
    "figma_select_full_frame": "Please select a complete frame in Figma",
    "figma_export_title_active": "Export selected Figma frame as HTML",
    "figma_select_for_export": "Please select a complete Figma frame to export as HTML"
  },

  "vi-VN": {
    // Startup
    "startup_title": "Đang kết nối dịch vụ cục bộ",
    "startup_message": "Đang kiểm tra 127.0.0.1:18787 và tải cấu hình mô hình…",
    "startup_retry": "Kết nối lại",

    // Topbar
    "brand_title": "UILayerCraft",
    "ai_slice": "AI Phân rã",
    "ai_slice_help": "Nhận diện cùng lúc các hình cắt PNG thông thường và nền thị giác chính hoàn chỉnh; hình cắt thường được thêm thẳng vào canvas, nền hoàn chỉnh sẽ được tạo sau khi xác nhận phạm vi",
    "zoom_out": "Thu nhỏ",
    "zoom_reset": "Đặt lại 100%",
    "zoom_in": "Phóng to",
    "zoom_fit": "Vừa khung",
    "canvas_zoom": "Thu phóng Canvas",
    "slice_import": "Nhập hình cắt",
    "slice_import_help": "Nhập trực tiếp nền và tài nguyên hình cắt hiện tại vào Figma",
    "slice_import_fig_web": "Tải hình cắt .fig",
    "slice_import_fig_web_help": "Đóng gói nền và tài nguyên hình cắt theo tọa độ gốc thành file .fig, có thể mở trực tiếp trong Figma sau khi tải về",
    "ai_layer_import": "Nhập Layer bằng AI",
    "ai_layer_import_help": 'Sau khi xác nhận hình cắt, AI sẽ nhận diện văn bản, bố cục và tài nguyên hình cắt trên canvas để nhập thành các layer có thể chỉnh sửa. Độ chính xác phụ thuộc vào "Mô hình hiểu ảnh" trong Cài đặt',
    "export_figma_frame_html": "Xuất HTML",
    "export_figma_frame_html_hint": "Vui lòng chọn một khung vẽ hoàn chỉnh trong Figma",
    "window_toggle_collapse": "Thu gọn cửa sổ",
    "window_toggle_expand": "Mở rộng cửa sổ",
    "step_load": "Nạp ảnh",
    "step_slice": "Tách ảnh",
    "step_export": "Xuất",

    // Language
    "language": "Ngôn ngữ",
    "lang_en": "🇬🇧 English",
    "lang_vi": "🇻🇳 Tiếng Việt",

    // Modes
    "mode_text_to_image": "Văn bản thành ảnh",
    "mode_image_to_image": "Ảnh thành ảnh",
    "step_1_prompt": "1. Nhập mô tả",
    "prompt_placeholder": "Nhập mô tả tạo ảnh giao diện UI, tối đa 1000 ký tự...",
    "upload_ref_headline": "Dán ảnh hoặc nhấp để tải lên",
    "upload_ref_subtext": "Hỗ trợ tải lên nhiều ảnh hoặc dán liên tục nhiều ảnh tham khảo",
    "step_2_ratio": "2. Tỉ lệ khung hình",
    "ratio_square": "Vuông",
    "ratio_landscape": "Ngang",
    "ratio_traditional": "Chuẩn 4:3",
    "ratio_portrait": "Dọc 3:4",
    "ratio_phone": "Điện thoại 9:16",
    "ratio_custom": "Tùy chỉnh",
    "ratio_custom_hint": "Nhập kích thước thủ công",
    "btn_ai_generate": "Tạo ảnh AI",
    "or_separator": "hoặc",
    "btn_local_image": "Tải ảnh từ máy",

    // Slice Panel
    "cut_title": "Tài nguyên hình cắt",
    "export_slices": "Xuất gói hình cắt",
    "transparent_all": "Tất cả trong suốt",
    "toggle_all_slices_hide": "Ẩn tất cả",
    "toggle_all_slices_show": "Hiện tất cả",
    "repair_preview": "Xem trước vẽ bù",
    "settings_trigger": "Cài đặt",
    "new_work_trigger": "Bắt đầu phiên mới",
    "drafts_trigger": "Lịch sử",
    "drafts_head": "Lịch sử phiên làm việc",
    "drafts_copy": "Tạo bản sao",
    "drafts_close": "Đóng lịch sử",

    // Settings Panel
    "settings_title": "Cài đặt mô hình",
    "btn_new_api": "+ Thêm API mới",
    "settings_close": "Đóng cài đặt",
    "section_current_use": "Đang sử dụng",
    "section_current_use_hint": "Lưu và áp dụng ngay sau khi chuyển đổi",
    "section_model_api": "Danh sách API",
    "section_model_api_hint": "Có thể tạo nhiều cấu hình và chọn theo mục đích sử dụng",
    "section_language": "Ngôn ngữ giao diện",
    "section_language_hint": "Chọn ngôn ngữ hiển thị của ứng dụng",
    "task_vision": "Hiểu hình ảnh",
    "task_vision_hint": "AI phân rã, nhập layer AI và phân tích SVG",
    "task_vision_help": "Gọi POST /v1/chat/completions. Mô hình cần hỗ trợ đầu vào hình ảnh.",
    "task_image": "Tạo & Sửa hình ảnh",
    "task_image_hint": "Văn bản thành ảnh, ảnh trong suốt, khôi phục nền và sửa cục bộ",
    "task_image_help": "Tạo ảnh gọi POST /v1/images/generations; sửa ảnh gọi POST /v1/images/edits, ưu tiên dùng Mask độc lập, nếu không hỗ trợ sẽ dùng ảnh tham khảo ngữ nghĩa.",
    "select_config": "Vui lòng chọn cấu hình",
    "not_configured": "Chưa cấu hình",
    "no_available_api": "Chưa có API khả dụng",
    "no_model_config": "Chưa có cấu hình mô hình nào",
    "unnamed_api": "API chưa đặt tên",
    "test_passed": "Kiểm tra thành công",
    "test_failed": "Kiểm tra thất bại",
    "test_neutral": "Kiểm tra",
    "mask_supported": "Hỗ trợ Mask",
    "mask_unsupported": "Không hỗ trợ Mask",
    "active_use_prefix": "Đang dùng cho ",
    "btn_edit": "Chỉnh sửa",
    "seconds_unit": "giây",

    // Model Config Dialog
    "dialog_new_api": "Thêm cấu hình API mới",
    "dialog_edit_api": "Chỉnh sửa cấu hình API",
    "close_api_edit": "Đóng trình sửa API",
    "form_name": "Ghi chú (Tùy chọn)",
    "form_name_placeholder": "Ví dụ: OpenAI chính thức",
    "form_base_url": "Base URL",
    "form_model": "Mô hình (Model)",
    "btn_fetch_models": "Lấy danh sách",
    "form_timeout": "Thời gian chờ (giây)",
    "form_api_key": "API Key",
    "btn_show_key": "Hiện",
    "btn_hide_key": "Ẩn",
    "legend_purpose": "Dùng cho",
    "btn_delete": "Xóa",
    "btn_test": "Kiểm tra",
    "btn_save_apply": "Lưu & Áp dụng",

    // Slice Editor
    "slice_editor_title": "Chỉnh sửa hình cắt",
    "slice_editor_aria": "Trình chỉnh sửa hình cắt",
    "tool_brush": "Bút vẽ",
    "tool_eraser": "Tẩy xóa",
    "tool_thickness": "Kích thước",
    "btn_ai_complete": "AI Vẽ bù",
    "btn_cancel_ai": "Hủy AI vẽ bù",
    "btn_save_to_slice": "Lưu vào hình cắt",
    "unsaved_title": "Lưu các thay đổi?",
    "unsaved_desc": "Hình cắt này có thay đổi ảnh chưa được lưu.",
    "btn_discard": "Không lưu",
    "btn_save_changes": "Lưu thay đổi",
    "slice_settings_kicker": "Cài đặt hình cắt",
    "close_slice_settings": "Đóng cài đặt hình cắt",

    // Workspace & Restore
    "restore_work_title": "Phát hiện phiên làm việc chưa hoàn tất",
    "restore_work_desc": "Bạn có thể khôi phục lại ảnh, tài nguyên hình cắt và bản xem trước layer AI lần trước.",
    "restore_remember": "Không nhắc lại",
    "btn_start_new_work": "Bắt đầu phiên mới",
    "btn_restore_work": "Khôi phục phiên làm việc",
    "custom_size_title": "Kích thước tùy chỉnh",
    "custom_size_width": "Chiều rộng",
    "custom_size_height": "Chiều cao",
    "custom_size_hint": "Hỗ trợ 256–4096px",
    "record_note_title": "Sửa ghi chú",
    "record_note_placeholder": "Nhập ghi chú cho riêng bạn",
    "btn_cancel": "Hủy",
    "btn_confirm": "Xác nhận",

    // Background Decomposition
    "bg_confirm_title": "Chọn ảnh nền cần khôi phục",
    "bg_confirm_desc": "Khung xanh là nền hoàn chỉnh, khung đỏ sẽ bị xóa khỏi nền. Chữ nghệ thuật, tranh minh họa và logo thương hiệu được giữ nguyên theo mặc định.",
    "btn_regenerate_ai": "Nhận diện lại bằng AI",
    "btn_generate_full_bg": "Tạo ảnh nền hoàn chỉnh",
    "bg_zoom_aria": "Thu phóng Canvas",

    // AI Layer Preview & Inspector
    "ai_preview_title": "Xem trước Layer AI",
    "preview_zoom_aria": "Thu phóng xem trước",
    "btn_download_html": "Tải HTML",
    "btn_import_figma": "Nhập thiết kế vào Figma",
    "btn_download_fig": "Tải thiết kế .fig",
    "import_settings": "Cài đặt nhập",
    "high_fidelity_capture": "Chụp độ nét cao (Playwright/CDP)",
    "high_fidelity_desc": "Bổ sung pseudo-elements, bộ lọc, cắt xén và nền phức tạp.",
    "inspector_aria": "Trình kiểm tra bố cục",
    "inspector_elements": "Elements",
    "inspector_elements_hint": "Chọn để xóa phần tử đã tạo",
    "inspector_waiting": "Đang chờ nội dung xem trước",
    "inspector_layout": "Layout",
    "inspector_select_element": "Chọn một phần tử để xem bố cục",
    "resize_inspector_width": "Điều chỉnh độ rộng bảng kiểm tra",

    // Loading Dialogs
    "loading_processing": "Đang xử lý...",
    "loading_ai_layer": "Đang nhập Layer bằng AI",
    "loading_ai_layer_desc": "Đang chuẩn bị yêu cầu mô hình hiểu ảnh phân tích văn bản, bố cục và tài nguyên hình cắt…",
    "loading_ai_decomp": "Đang phân rã UI bằng AI",
    "loading_ai_decomp_desc": "Đang nhận diện các hình cắt, ảnh nền hoàn chỉnh và lớp giao diện che phủ…",
    "elapsed_time": "Thời gian: {seconds} giây",
    "btn_retry": "Thử lại",

    // Status & Prompts
    "status_close": "Đóng thông báo",
    "window_resizer": "Kéo để thay đổi kích thước cửa sổ",
    "prompt_placeholder_img2img": "Dán ảnh tham khảo, sau đó nhập mô tả...",
    "editable_title_embedded": "Ghi lại bản xem trước thành layer có thể chỉnh sửa trong Figma",
    "no_slice_area": "Chưa có vùng cắt ảnh nào",
    "empty_drafts": "Chưa có lịch sử cắt ảnh nào",
    "reading_drafts": "Đang tải lịch sử phiên làm việc…",
    "multi_values": "Nhiều giá trị",
    "apply_to_all": "Nhập để áp dụng tất cả",
    "selected_slices_count": "Đã chọn {count} hình cắt",
    "fill_prompt_warning": "Vui lòng nhập mô tả trước.",
    "upload_image_warning": "Vui lòng dán hoặc tải lên ảnh PNG, JPG hoặc WebP.",
    "btn_reconnect": "Kết nối lại",
    "btn_exit_preview": "Thoát xem trước vẽ bù",

    // Dynamic status messages (app.js / state files)
    "status_repair_preview_generating": "Đang tạo xem trước vẽ bù...",
    "status_repair_preview_failed": "Tạo xem trước vẽ bù thất bại: {error}",
    "status_image_generating": "Đang yêu cầu mô hình tạo ảnh…",
    "status_generate_failed": "Tạo ảnh thất bại: {error}",
    "status_draft_save_failed_keep": "Lưu lịch sử thất bại, vẫn giữ lại không gian làm việc hiện tại: {error}",
    "status_draft_save_failed": "Lưu lịch sử thất bại: {message}",
    "status_local_image_reading": "Đang đọc ảnh từ máy…",
    "status_local_image_failed": "Đọc ảnh từ máy thất bại: {error}",
    "status_no_vision_model": "Vui lòng cấu hình mô hình hiểu ảnh trong Cài đặt",
    "status_no_figma_canvas": "Vui lòng chọn canvas Figma trước",
    "status_figma_frame_select_first": "Vui lòng chọn một khung vẽ hoàn chỉnh trong plugin Figma trước khi xuất.",
    "status_figma_frame_reading": "Đang đọc khung Figma và tạo HTML…",
    "status_figma_frame_timeout": "Xuất HTML khung Figma hết thời gian chờ. Vui lòng thử lại.",
    "status_figma_frame_failed": "Xuất HTML khung Figma thất bại: {error}",
    "status_imported_to_figma": "Đã nhập nguồn vào Figma.",
    "status_cancelling": "Đang hủy...",
    "status_image_count_mismatch": "Đã yêu cầu {requested} ảnh, thực tế nhận được {received}.",
    "status_image_generated": "Ảnh đã được tạo. {note}",
    "status_image_mock": "Chưa kết nối backend hoặc chưa cấu hình API Key — đã dùng tài nguyên mẫu.",
    "status_image_provider_note": "Mô hình: {model} · Kích thước yêu cầu: {size} · Kích thước trả về: {returnedSize}",
    "status_local_image_type": "Vui lòng chọn ảnh PNG, JPG hoặc WebP.",
    "status_ai_repair_kept": "Đã giữ lại ảnh AI đầy đủ; đã tạo bản sao trước khi sửa để di chuyển",
    "status_update_crop_failed": "Cập nhật cắt hình cắt thất bại: {error}",
    "status_figma_import_timeout": "Figma import không trả về tiến độ trong {seconds} giây và đã dừng. Vui lòng kiểm tra Figma và thử lại.",
    "status_importing_layers": "Đang nhập {processed} / {total} layer…",
    "status_import_done": "Đã nhập {count} layer, {warnings}",
    "status_html_download_started": "Đã bắt đầu tải HTML.",
    "status_html_download_warnings": "Đã bắt đầu tải HTML, {count} thuộc tính hoặc tài nguyên đã bỏ qua.",
    "status_html_export_failed": "Xuất HTML khung Figma thất bại: {error}",
    "status_layers_skipped": "{count} layer không được hỗ trợ chưa nhập",
    "status_groups_failed": "{count} thành phần chưa được nhóm",

    // Slice AI state messages
    "slice_asset_default_name": "Tài nguyên hình cắt",
    "slice_reset_transparent_svg": "\"{name}\" đã được làm trong suốt và chuyển thành SVG. Điều chỉnh hình cắt sẽ hủy trong suốt và SVG. Tiếp tục?",
    "slice_reset_transparent": "\"{name}\" đã được làm trong suốt. Điều chỉnh hình cắt sẽ hủy trong suốt. Tiếp tục?",
    "slice_reset_svg": "\"{name}\" đã được chuyển thành SVG. Điều chỉnh hình cắt sẽ hủy SVG. Tiếp tục?",
    "slice_reset_processed": "\"{name}\" đã được xử lý. Điều chỉnh hình cắt sẽ hủy kết quả xử lý. Tiếp tục?",

    // HTML preview cache messages
    "cache_stale_warning": "Tài nguyên hình cắt đã thay đổi. Nhấn \"Nhận diện lại bằng AI\" để cập nhật bản xem trước.",
    "cache_missing_slices": "Hình cắt trong bộ nhớ đệm không còn tồn tại, đang nhận diện lại bằng AI.",
    "cache_open_failed": "Không thể mở bộ nhớ đệm nhập layer AI",

    // Figma frame export messages
    "figma_select_canvas_first": "Vui lòng chọn canvas Figma trước",
    "figma_select_full_frame": "Vui lòng chọn một khung vẽ hoàn chỉnh trong Figma",
    "figma_export_title_active": "Xuất khung Figma đã chọn thành HTML",
    "figma_select_for_export": "Vui lòng chọn một khung vẽ Figma hoàn chỉnh để xuất HTML"
  }
};


let currentI18nLanguage = DEFAULT_LANGUAGE;

function getI18nLanguage() {
  return currentI18nLanguage;
}

function t(key, fallbackOrParams = "", params = null) {
  let fallback = "";
  let actualParams = params;
  if (typeof fallbackOrParams === "object" && fallbackOrParams !== null) {
    actualParams = fallbackOrParams;
    fallback = "";
  } else if (typeof fallbackOrParams === "string") {
    fallback = fallbackOrParams;
  }

  const langDict = I18N_TRANSLATIONS[currentI18nLanguage] || I18N_TRANSLATIONS[DEFAULT_LANGUAGE];
  let text = langDict?.[key];
  if (text === undefined) {
    text = I18N_TRANSLATIONS[DEFAULT_LANGUAGE]?.[key];
  }
  if (text === undefined) {
    text = fallback || key;
  }

  if (actualParams && typeof actualParams === "object") {
    for (const [k, v] of Object.entries(actualParams)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return text;
}

function applyI18n(root = document) {
  if (!root) return;

  // Translate text content
  const textElements = root.querySelectorAll("[data-i18n]");
  textElements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const translated = t(key);
    if (translated) {
      el.textContent = translated;
    }
  });

  // Translate placeholder
  const placeholderElements = root.querySelectorAll("[data-i18n-placeholder]");
  placeholderElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (!key) return;
    const translated = t(key);
    if (translated) {
      el.setAttribute("placeholder", translated);
    }
  });

  // Translate title
  const titleElements = root.querySelectorAll("[data-i18n-title]");
  titleElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (!key) return;
    const translated = t(key);
    if (translated) {
      el.setAttribute("title", translated);
    }
  });

  // Translate aria-label
  const ariaElements = root.querySelectorAll("[data-i18n-aria]");
  ariaElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (!key) return;
    const translated = t(key);
    if (translated) {
      el.setAttribute("aria-label", translated);
    }
  });

  // Translate data-import-help
  const helpElements = root.querySelectorAll("[data-i18n-help]");
  helpElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-help");
    if (!key) return;
    const translated = t(key);
    if (translated) {
      el.setAttribute("data-import-help", translated);
    }
  });

  // Update radio labels for modelConfigPurpose
  const purposeVision = root.querySelector('input[name="modelConfigPurpose"][value="vision"]');
  if (purposeVision && purposeVision.nextSibling) {
    purposeVision.nextSibling.textContent = t("task_vision", "Vision Model");
  }
  const purposeImage = root.querySelector('input[name="modelConfigPurpose"][value="image"]');
  if (purposeImage && purposeImage.nextSibling) {
    purposeImage.nextSibling.textContent = t("task_image", "Image Generation / Inpaint");
  }

  // Update current language label in UI if present
  const currentLangLabel = document.getElementById("currentLangLabel");
  if (currentLangLabel) {
    if (currentI18nLanguage === "en-US") currentLangLabel.textContent = "EN";
    else if (currentI18nLanguage === "vi-VN") currentLangLabel.textContent = "VI";
  }

  // Update active state in language menu / options
  document.querySelectorAll("[data-lang-choice]").forEach((btn) => {
    const lang = btn.getAttribute("data-lang-choice");
    if (lang === currentI18nLanguage) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function setI18nLanguage(lang, options = { persist: true }) {
  if (!I18N_TRANSLATIONS[lang]) {
    lang = DEFAULT_LANGUAGE;
  }
  currentI18nLanguage = lang;
  if (options.persist && typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(I18N_STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage errors
    }
  }
  if (typeof document !== "undefined") {
    applyI18n(document);
  }
  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new CustomEvent("i18n:languagechange", { detail: { language: lang } }));
  }
}

// The UI ships English-only; the vi-VN dictionary is kept for a future language switch,
// and a language saved by older builds is ignored so it cannot mix languages.
function initI18n() {
  currentI18nLanguage = DEFAULT_LANGUAGE;
  applyI18n(document);
}

// Attach to window for global access
if (typeof window !== "undefined") {
  window.i18n = {
    t,
    getLanguage: getI18nLanguage,
    setLanguage: setI18nLanguage,
    apply: applyI18n,
    init: initI18n,
    translations: I18N_TRANSLATIONS
  };
  window.t = t;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    I18N_STORAGE_KEY,
    DEFAULT_LANGUAGE,
    I18N_TRANSLATIONS,
    getI18nLanguage,
    setI18nLanguage,
    applyI18n,
    initI18n,
    t
  };
}
