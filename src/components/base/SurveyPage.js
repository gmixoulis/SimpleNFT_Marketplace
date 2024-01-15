import "survey-core/defaultV2.css";
import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import { BACKEND_URL } from "./constants";
import { useCallback } from "react";
import { ethers } from "ethers";
import encrypt from "./encrypt";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import quizcss from "../../styles/quizz.css";
StylesManager.applyTheme("defaultV2");
function SurveyPage({ survey }) {
  let navigate = useNavigate();

  const surveyModel = new Model(survey);
  const isWalletInstalled = () => {
    if (!window.ethereum) {
      alert("No crypto wallet found. Please install it.");
    } else {
      return true;
    }
  };

  const signMessage = async (message) => {
    try {
      if (isWalletInstalled()) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        const address = await signer.getAddress();
        return {
          signature,
          address,
        };
      }
    } catch (err) {
      console.log(err);
    }
  };
  async function saveSurveyResults(url, json) {
    await axios
      .post(url, {
        body: json,
      })
      .then((response) => {
        navigate("/certificate", { state: response.data });
      })
      .catch((error) => {
        if (error.status === 500) {
          alert(error.message);
        }
      });
  }

  var storageName = "survey_history";
  function saveSurveyData(survey) {
    var data = survey.data;
    data.pageNo = survey.currentPageNo;
    window.localStorage.setItem(storageName, JSON.stringify(data));
  }
  surveyModel.onPartialSend.add(function (sender) {
    saveSurveyData(sender);
  });

  surveyModel.sendResultOnPageNext = true;
  var prevData = window.localStorage.getItem(storageName) || null;
  if (prevData) {
    var data = JSON.parse(prevData);
    surveyModel.data = data;
    if (data.pageNo) {
      surveyModel.currentPageNo = data.pageNo;
    }
  }
  function clearStorage() {
    window.localStorage.removeItem(storageName);
  }
  const surveyComplete = useCallback(async (sender) => {
    saveSurveyData(sender);
    const signature = await signMessage(JSON.stringify(sender.data));
    const encryptedMSG = await encrypt({
      signature: signature,
      secretMessage: JSON.stringify(sender.data),
    });
    clearStorage();
    saveSurveyResults(BACKEND_URL + "/survey/submit-survey", encryptedMSG);
  }, []);

  surveyModel.onComplete.add(surveyComplete);

  const html = <Survey model={surveyModel} />;
  return html;
}

export default SurveyPage;
