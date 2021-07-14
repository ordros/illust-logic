import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import EditQuestionPage from "../EditQuestionPage";
import SolveQuestionPage from "../SolveQuestionPage";

const StaticRoutePage = () => {
  const location = useLocation();

  const [type, setType] = useState('create');

  useEffect(() => {
    if (location) {
      if (location.search.indexOf("type=solve") > 0) {
        setType('solve');
      } else {
        setType('create');
      }
    }
  }, [location])

  return (
    <>
      {type === 'solve' && <SolveQuestionPage />}
      {type === 'create' && <EditQuestionPage fromStaticPage />}
    </>
  )
};

export default StaticRoutePage;