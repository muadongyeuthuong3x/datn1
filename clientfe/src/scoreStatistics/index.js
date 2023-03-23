
import ScoreStatis from "./scoreStatis";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ScoreStatistic = () => {
    const { loading } = useSelector(state => state.ttScoreStudent);
    return <DashBoard ComponentProps={ScoreStatis} loading={loading} />
}

export default ScoreStatistic;

