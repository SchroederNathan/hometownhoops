import { FC } from "react";
import { useHooks } from "./Hooks";

type Props = {
  onImageChange?: (newType: any) => void;
};

export const FileInput: FC = ({
  onImageChange
}: Props) => {
  const { handleFiles, imageContainerRef } = useHooks();

  return (
    <div className="input-group mb-3 ">
      <label htmlFor='imageUpload' className='form-label fs-5 w-100'>Image</label>
      <input type="file" className="form-control rounded" accept="image/*" onChange={handleFiles} id="imageUpload" />
      <div ref={imageContainerRef}  />
    </div>
  );
};
