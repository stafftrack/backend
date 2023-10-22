import supabase from "./api/supabase.js";
import sendEmail from "./api/utils/sendEmail.js";
import cron from 'node-cron'

cron.schedule('*/5 * * * *', async () => {
  try{
    const { data, error } = await supabase.from('RepairPrediction').select('Zone, DateTime');

    const today = new Date();
    data.forEach(element => {
      const date = new Date(element.DateTime);
      const Img_path =  "./static/pred_repair.jpg";
      if( today.getDate()-date.getDate() < 30 ){
        sendEmail().text_attachments(
            "dailydailyimf15@gmail.com",
            `X線機のメンテナンス`,
            `メーカーの皆様、弊社のX線機は定期的なメンテナンスが必要です。ご都合の良い時間にメンテナンスをお願いできますか？  Zone:${element.Zone}`,
            `ContrabandImage.jpg`,
            Img_path
        )
      }
    });
  }catch(err){
    console.log(err);
  }
});

export default () => {
  console.log('Run sendRepairMessage.js');
}