import {TxKeyPath} from 'i18n/i18n';
import {createSavingsGroup} from 'storage/mutations/savings-group.mutations';
import {CreateSavingsGroupParserParams} from './parser';

export async function CreateSavingsGroupParser(
  data: CreateSavingsGroupParserParams,
): Promise<TxKeyPath | undefined> {
  const {
    'date-of-constitution': date,
    'fine-value': fine,
    'number-of-active-members': activeMembers,
    'number-of-cycles': numberOfCycles,
    'number-of-members': members,
    district,
    province,
    name,
    'interests-fee': interestsFee,
    zone,
    'social-fund-value': socialFund,
    cycles,
  } = data;

  try {
    await createSavingsGroup({
      name: name as string,
      fineValue: parseFloat(fine as string),
      numberOfActiveMembers: parseFloat(activeMembers as string),
      numberOfCycles: parseFloat(numberOfCycles as string),
      numberOfMembers: parseFloat(members as string),
      province: province as string,
      district: district as string,
      zone: zone as string,
      interestsFee: parseFloat(interestsFee as string),
      socialFund: parseFloat(socialFund as string),
      dateOfConstitution: Date.parse(<string>date),
      cycles: cycles.map(item => {
        const {
          'cycles-start-date': start,
          'cycles-name': name,
          'cycles-end-date': end,
        } = item;
        console.log('cycles', {start, name, end, item});
        return {
          name: item['cycles-name'],
          start: new Date(start as string),
          end: new Date(end as string),
        };
      }),
    });
    return undefined;
  } catch (e) {
    console.log(e);

    return 'form.error_retry';
  }
}
