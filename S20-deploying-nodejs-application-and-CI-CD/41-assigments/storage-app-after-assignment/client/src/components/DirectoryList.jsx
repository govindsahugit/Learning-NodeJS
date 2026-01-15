import DirectoryItem from "./DirectoryItem";

function DirectoryList({
  items,
  handleRowClick,
  activeContextMenu,
  contextMenuPos,
  handleContextMenu,
  getFileIcon,
  isUploading,
  progressMap,
  handleCancelUpload,
  handleDeleteFile,
  handleDeleteDirectory,
  openRenameModal,
  BASE_URL,
  adminView,
  handleShareDirectory,
  handleShareFile,
  handleUnpublicFile,
  handleUnpublicDirectory,
  openDetailsPopup,
  isPublic
}) {
  return (
    <div className="directory-list">
      {items.map((item) => {
        const uploadProgress = progressMap[item.id] || 0;

        return (
          <DirectoryItem
            isPublic={isPublic}          
            openDetailsPopup={openDetailsPopup}
            handleUnpublicDirectory={handleUnpublicDirectory}
            handleUnpublicFile={handleUnpublicFile}
            handleShareDirectory={handleShareDirectory}
            handleShareFile={handleShareFile}
            adminView={adminView}
            key={item.id}
            item={item}
            handleRowClick={handleRowClick}
            activeContextMenu={activeContextMenu}
            contextMenuPos={contextMenuPos}
            handleContextMenu={handleContextMenu}
            getFileIcon={getFileIcon}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            handleCancelUpload={handleCancelUpload}
            handleDeleteFile={handleDeleteFile}
            handleDeleteDirectory={handleDeleteDirectory}
            openRenameModal={openRenameModal}
            BASE_URL={BASE_URL}
          />
        );
      })}
    </div>
  );
}

export default DirectoryList;
