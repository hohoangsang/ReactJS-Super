import React, { useEffect, useState } from "react";

export default function PreviewAvatar() {
  const [avatar, setAvatar] = useState();

  const handlePreviewAvatar = (event) => {
    const file = event.target.files[0];

    const urlPreview = URL.createObjectURL(file);

    file.preview = urlPreview;

    setAvatar(file);
  };

  useEffect(() => {
    //cleanup function
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  return (
    <div>
      <input type="file" onChange={handlePreviewAvatar} />

      {avatar && <img src={avatar.preview} alt="avatar" />}
    </div>
  );
}
