import Axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { getError } from 'utils/helpers';
import { toast } from 'react-toastify';
import Spinner from './../utils/Spinner';
import { UploadIcon } from './../common/Icons';
import Humanize from 'humanize-plus';
import Image from '../common/Image';
import { useFormikContext } from 'formik';

// https://blog.devgenius.io/upload-files-to-amazon-s3-from-a-react-frontend-fbd8f0b26f5

const UPLOAD_API_URL =
  'https://staging-ballers-api.herokuapp.com/api/v1/user/upload-to-highrachy';
const Upload = ({
  afterUpload,
  allowPdf,
  changeText,
  children,
  defaultImage,
  folder,
  imgOptions,
  maxFileSize,
  name,
  oldImage,
  uploadText,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const AWS_BUCKET = 'highrachy';
  const formikProps = useFormikContext();

  const onFileChange = async (event) => {
    const fileToUpload = event?.target?.files?.[0];

    toast.error('testing 123');

    setLoading(true);
    if (!fileToUpload) return null;

    if (fileToUpload.size > maxFileSize) {
      toast.error(
        `'${
          fileToUpload.name
        }' is too large, please pick a file smaller than ${Humanize.fileSize(
          maxFileSize
        )}`
      );
      setLoading(false);
      return null;
    }

    if (fileToUpload) {
      const type = fileToUpload.type;
      const extension = fileToUpload.name.split('.').pop();
      let allowedFormats = ['jpg', 'jpeg', 'gif', 'png'];

      if (allowPdf) {
        allowedFormats.push('pdf');
      }

      if (!allowedFormats.includes(extension)) {
        toast.error(
          `Unsupported extension. Only ${allowedFormats.join(
            ', '
          )} are allowed.`
        );
        setLoading(false);
        return null;
      }

      const uploadConfig = await Axios.get(UPLOAD_API_URL, {
        params: {
          extension,
          type,
          folder,
          bucket: AWS_BUCKET,
        },
      }).catch(function (error) {
        toast.error(getError(error));
        setLoading(false);
        return null;
      });

      if (uploadConfig) {
        console.log('uploadConfig', uploadConfig);
        Axios.put(uploadConfig.data.url, fileToUpload, {
          headers: { 'Content-Type': type },
        })
          .then(() => {
            const fileURL = `https://${AWS_BUCKET}.s3.amazonaws.com/${uploadConfig.data.key}`;
            setUploadedFile(fileURL);
            afterUpload(fileURL);
            if (formikProps) {
              formikProps.setFieldValue(name, fileURL);
            }
            setLoading(false);
          })
          .catch(function (error) {
            toast.error(getError(error));
            setLoading(false);
          });

        return null;
      }
      toast.error('Unable to upload file');
      setLoading(false);
    }
  };

  const currentImage = uploadedFile || oldImage || defaultImage;
  const inputHasAnImage = !!currentImage;
  const hasUploadedFile = !!uploadedFile || !!oldImage;

  const supportedFormats = ['.jpg', '.jpeg', '.gif', '.png'];
  if (allowPdf) supportedFormats.push('.pdf');

  const accept = supportedFormats.join(',');
  const id = name || 'upload-file';
  return (
    <>
      {children ||
        (inputHasAnImage && (
          <Image
            defaultImage={defaultImage}
            src={uploadedFile || oldImage}
            name={name || 'uploaded-image'}
            alt={name}
            {...imgOptions}
          />
        ))}
      <div className="custom-file-upload mt-3">
        <input
          type="file"
          id={id}
          name={name || 'myfile'}
          accept={accept}
          onChange={onFileChange}
        />
        <label htmlFor={id}>
          {loading ? (
            <>
              <Spinner small /> Uploading File
            </>
          ) : (
            <>
              <UploadIcon />{' '}
              {hasUploadedFile ? (
                <>{changeText || 'Change File'}</>
              ) : (
                <>{uploadText || 'Upload New File'}</>
              )}
            </>
          )}
        </label>
      </div>
      <div className="small mb-3 text-muted">
        Supported Formats: {Humanize.oxford(supportedFormats)} files. File size
        should be less than {Humanize.fileSize(maxFileSize)}
      </div>
      {/* Add formik Error */}
    </>
  );
};

Upload.propTypes = {
  afterUpload: PropTypes.func,
  allowPdf: PropTypes.bool,
  changeText: PropTypes.string,
  children: PropTypes.any,
  defaultImage: PropTypes.string,
  folder: PropTypes.string,
  imgOptions: PropTypes.object,
  maxFileSize: PropTypes.number,
  name: PropTypes.string,
  oldImage: PropTypes.string,
  uploadText: PropTypes.string,
};

Upload.defaultProps = {
  afterUpload: () => {},
  allowPdf: false,
  changeText: null,
  children: null,
  defaultImage: null,
  folder: 'unknown',
  imgOptions: {},
  maxFileSize: 1_024 * 1_000, // 1 MB
  name: null,
  oldImage: null,
  uploadText: null,
};

export default Upload;
