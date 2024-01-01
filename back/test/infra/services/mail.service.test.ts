import { MailService } from 'src/infra/services/mail.service';
import * as mailhog from 'mailhog';

describe.only('IndexationService', () => {
  it('should index document', async () => {
    const mailService = new MailService();

    const existingMails = await mailhog().search('test@test.test');
    if (existingMails.count > 0) {
      for (const item of existingMails.items) {
        mailhog().deleteMessage(item.ID);
      }
    }
    await mailService.send('test@test.test', 'bonjour', 'tout le monde');

    const newMails = await mailhog().search('test@test.test');
    expect(newMails.count).toEqual(1);
  });
});
