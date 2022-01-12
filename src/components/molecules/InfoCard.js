import moment from "moment"

const InfoCard = ({ pollenList, lastDate, elapsed, setDarkMode }) => {
return <>
    <h2 children='follow the pollen'/>
    <p children={`IMG count: ${pollenList.length}`}/>
    <p children={`${(pollenList.length / lastDate).toFixed(2)} imgs / second`}/>
    <p children={`${moment().diff(elapsed, 'minutes') } minutes elapsed`}/>
    <button children='dark mode' onClick={() => setDarkMode(state => !state)}/>
</>
}

export default InfoCard