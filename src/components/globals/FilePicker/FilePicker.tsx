import React, { ReactNode, useEffect } from "react";

import styles from "src/components/globals/FilePicker/FilePicker.module.css";

type Format = "audio" | "video" | "image";

interface FilePickerProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept: Format;
  render?: (value: File | null) => ReactNode;
}

export default function FilePicker(props: FilePickerProps) {
  const { value, onChange, accept, render } = props;

  useEffect(() => {
    return () => onChange(null);
  }, []);

  const formats = {
    image: ".png, .jpg, .jpeg",
    audio: "audio/mp3",
    video: "video/mp4",
  };

  return (
    <label className={styles["container"]}>
      <input
        type="file"
        accept={formats[accept]}
        onChange={(e) => onChange(e.target.files?.item(0) || null)}
      />
      {render?.(value)}
    </label>
  );
}
