import momentZone from "moment-timezone";
let moment:any = momentZone;

  
  export async function globalData(){

  let DataGlobalZone =  fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(async data => {
        let { ip,hostname,city,region,country,loc,org,postal,timezone,readme} = data;
        let ZONE_GLOBAL = moment.tz(timezone).format("YYYY-MM-DD HH:mm:ss");
        let ZONE_TIME = moment.tz(timezone).format("HH:mm:ss");

        let DataGlobal: Object = {
            ip: ip, hostname: hostname,city: city,region: region,country: country,
            loc: loc,org: org,postal: postal,ZONE_GLOBAL: ZONE_GLOBAL,ZONE_TIME: ZONE_TIME,
            readme: readme,timezone: timezone 
        }
     return DataGlobal;

  })
  return DataGlobalZone
  .catch(error => {
    return {message: "ERROR_DATA_GLOBAL",error: error}
  });
  }
