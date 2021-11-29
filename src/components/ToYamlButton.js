import React, { useCallback } from 'react';
import { Button } from 'design-react-kit';
import { useSelector, useDispatch } from 'react-redux';
import { resetValidationResults, setDocumentText } from '../redux/actions.js';
import { getDocumentText, isValidationInProgress } from '../redux/selectors.js';

export const ToYamlButton = () => {
  const validationInProgress = useSelector((state) => isValidationInProgress(state));

  const reformatJson = (text) => JSON.stringify(JSON.parse(text), null, 2);
  const documentText = useSelector((state) => getDocumentText(state));
  const dispatch = useDispatch();
  const handleOnClick = useCallback(() => {
    dispatch(setDocumentText(reformatJson(documentText)));
    dispatch(resetValidationResults());
  }, [dispatch, documentText]);

  // console.log(Parsers.Yaml.stringify(Parsers.Yaml.parse(documentText)));
  return (
    <Button onClick={handleOnClick} color="custom-white" disabled={validationInProgress} icon={false} tag="button">
      Reformat
    </Button>
  );
};
