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
import { feedback, FeedbackMessage, getValidityClass } from './form-helper';
import classNames from 'classnames';

// https://blog.devgenius.io/upload-files-to-amazon-s3-from-a-react-frontend-fbd8f0b26f5

const UPLOAD_API_URL =
  'https://staging-ballers-api.herokuapp.com/api/v1/user/upload-to-highrachy';

const Upload = ({
  afterUpload,
  allowPdf,
  changeText,
  children,
  className,
  customFormats,
  defaultImage,
  folder,
  formGroupClassName,
  imgOptions,
  isValidMessage,
  maxFileSize,
  name,
  oldImage,
  showFeedback,
  uploadText,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const AWS_BUCKET = 'highrachy';
  let allowedFormats =
    customFormats.length > 0 ? customFormats : ['jpg', 'jpeg', 'gif', 'png'];

  if (allowPdf) {
    allowedFormats.push('pdf');
  }
  const formikProps = useFormikContext();

  const setErrorMessage = (errorMessage) => {
    console.log('formikProps', formikProps);
    formikProps && formikProps.setFieldTouched(name, true, false);
    formikProps && formikProps.setFieldError(name, errorMessage);
    toast.error(errorMessage);
    setLoading(false);
    return null;
  };

  const onFileChange = async (event) => {
    const fileToUpload = event?.target?.files?.[0];

    setLoading(true);
    if (!fileToUpload) return null;

    if (fileToUpload.size > maxFileSize) {
      setErrorMessage(
        `'${
          fileToUpload.name
        }' is too large, please pick a file smaller than ${Humanize.fileSize(
          maxFileSize
        )}`
      );
      return null;
    } else {
      const type = fileToUpload.type;
      const extension = fileToUpload.name.split('.').pop();

      if (!allowedFormats.includes(extension)) {
        setErrorMessage(
          `Unsupported extension. Only ${allowedFormats.join(
            ', '
          )} are allowed.`
        );
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
        setErrorMessage(getError(error));
        return null;
      });

      if (uploadConfig) {
        console.log('uploadConfig', uploadConfig);
        Axios.put(uploadConfig.data.url, fileToUpload, {
          headers: { 'Content-Type': type },
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
          },
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
            setErrorMessage(getError(error));
          });

        return null;
      }
      setErrorMessage('Unable to upload file');
    }
  };

  const currentOldImage = oldImage || formikProps?.values?.[name];
  const currentImage = uploadedFile || currentOldImage || defaultImage;
  const inputHasAnImage = !!currentImage;
  const hasUploadedFile = !!uploadedFile || !!currentOldImage;

  const supportedFormats = allowedFormats.map((extension) => '.' + extension);
  const helpText = `Supported Formats: ${Humanize.oxford(
    supportedFormats
  )} files. File size should be less than ${Humanize.fileSize(maxFileSize)}`;

  const accept = supportedFormats.join(',');
  const id = name || 'upload-file';
  return (
    <div className={formGroupClassName}>
      <div
        className={classNames(
          'form-control',
          className,
          getValidityClass(formikProps, name, showFeedback)
        )}
      >
        {children ||
          (inputHasAnImage && (
            <Image
              defaultImage={defaultImage}
              src={uploadedFile || currentOldImage}
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
      </div>
      {formikProps ? (
        <FeedbackMessage
          helpText={helpText}
          name={name}
          showFeedback={showFeedback}
          validMessage={isValidMessage}
        />
      ) : (
        { helpText }
      )}
    </div>
  );
};

Upload.propTypes = {
  afterUpload: PropTypes.func,
  allowPdf: PropTypes.bool,
  changeText: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  customFormats: PropTypes.array,
  defaultImage: PropTypes.string,
  folder: PropTypes.string,
  formGroupClassName: PropTypes.string,
  imgOptions: PropTypes.object,
  isValidMessage: PropTypes.string,
  maxFileSize: PropTypes.number,
  name: PropTypes.string,
  oldImage: PropTypes.string,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  uploadText: PropTypes.string,
};

Upload.defaultProps = {
  afterUpload: () => {},
  allowPdf: false,
  changeText: null,
  children: null,
  className: '',
  customFormats: [],
  defaultImage: null,
  folder: 'unknown',
  formGroupClassName: 'mb-4',
  imgOptions: {},
  isValidMessage: '',
  maxFileSize: 1_024 * 1_000, // 1 MB
  name: null,
  oldImage: null,
  showFeedback: feedback.ALL,
  uploadText: null,
};

export default Upload;