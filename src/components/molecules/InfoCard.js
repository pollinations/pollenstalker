import moment from "moment"

const InfoCard = ({ pollenList, lastDate, elapsed }) => {
return <>
    <h2 children='follow the pollen'/>
    <p children={`IMG count: ${pollenList.length}`}/>
    <p children={`${(pollenList.length / lastDate).toFixed(2)} imgs / second`}/>
    <p children={`${moment().diff(elapsed, 'minutes') } minutes elapsed`}/>
</>
}

export default InfoCard