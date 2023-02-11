import {TxKeyPath} from 'i18n/i18n';
import {database} from 'storage/database';
import {Beneficiary} from 'storage/models/beneficiary';
import {createBeneficiaryRecord} from 'storage/models/beneficiary.builder';
import {Cycle} from 'storage/models/cycle';
import {createCycleRecord} from 'storage/models/cycle.builder';
import {Initiative} from 'storage/models/initiative';
import {createInitiativeRecord} from 'storage/models/initiative.builder';
import {Location} from 'storage/models/location';
import {SavingsGroup} from 'storage/models/savings-group';
import {SavingsGroupBeneficiary} from 'storage/models/savings-group-beneficiary';
import {SavingsGroupBeneficiaryMonitoring} from 'storage/models/savings-group-beneficiary-monitoring';
import {createSavingsGroupBeneficiaryMonitoringRecord} from 'storage/models/savings-group-beneficiary-monitoring.builder';
import {createSavingsGroupBeneficiaryRecord} from 'storage/models/savings-group-beneficiary.builder';
import {SavingsGroupMonitoring} from 'storage/models/savings-group-monitoring';
import {createSavingsGroupMonitoringRecord} from 'storage/models/savings-group-monitoring.builder';
import {createSavingsGroupRecord} from 'storage/models/savings-group.builder';
import {getUserByUsername} from 'storage/queries/user';
import {
  CreateSavingsGroupMemberMonitoringParserParams,
  CreateSavingsGroupMemberParserParams,
  CreateSavingsGroupMonitoringParserParams,
} from 'store/form/parser/parser';

export type CreateSavingsGroupParams = {
  numberOfCycles: number;
  numberOfMembers: number;
  numberOfActiveMembers: number;
  socialFund: number;
  fineValue: number;
  interestsFee: number;
  dateOfConstitution: number;
  name: string;
  district: string;
  province: string;
  zone: string;
  cycles: {name: string; start: Date; end: Date}[];
};

export async function createSavingsGroup(
  {
    name,
    dateOfConstitution,
    district,
    fineValue,
    interestsFee,
    numberOfActiveMembers,
    numberOfCycles,
    numberOfMembers,
    socialFund,
    province,
    cycles: cyclesSubform,
    zone,
  }: CreateSavingsGroupParams,
  username: string,
) {
  console.log('createSavingsGroup', {username});
  const user = await getUserByUsername(username);
  const location = await database.get<Location>(Location.table).find(district);
  const initiative = database.get<Initiative>(Initiative.table).prepareCreate(
    createInitiativeRecord({
      name,
      dateOfConstitution,
      districtId: district,
      provinceId: province,
      zone,
      type: 'savings-group',
    }),
  );
  const group = database.get<SavingsGroup>(SavingsGroup.table).prepareCreate(
    createSavingsGroupRecord(
      {
        fineValue,
        interestsFee,
        numberOfActiveMembers,
        numberOfCycles,
        numberOfMembers,
        socialFund,
        dateOfConstitution,
      },
      initiative,
      location,
      user,
    ),
  );

  const cycles = cyclesSubform.map(({start, name, end}) => {
    return database.get<Cycle>(Cycle.table).prepareCreate(
      createCycleRecord(
        {
          name: name as string,
          startDate: start,
          endDate: end,
        },
        group,
      ),
    );
  });

  await database.write(
    async () => await database.batch(initiative, group, ...cycles),
  );
}

export async function createSavingsGroupMemberMonitoring(
  {
    'interest-value': interest,
    'loan-value': loan,
    'saved-value': saved,
    'social-fund-contribuition': socialFund,
    date,
  }: CreateSavingsGroupMemberMonitoringParserParams,
  savingsGroupBeneficiaryId: string,
  username: string,
): Promise<void | TxKeyPath> {
  try {
    console.log('createSavingsGroupMemberMonitoring', {username});
    const user = await getUserByUsername(username);
    const savingsGroupBeneficiary = await database
      .get<SavingsGroupBeneficiary>(SavingsGroupBeneficiary.table)
      .find(savingsGroupBeneficiaryId);

    await database.write(async () => {
      await database
        .get<SavingsGroupBeneficiaryMonitoring>(
          SavingsGroupBeneficiaryMonitoring.table,
        )
        .create(
          createSavingsGroupBeneficiaryMonitoringRecord(
            {
              interest: parseInt(interest as string),
              loan: parseInt(loan as string),
              date: new Date(date as string),
              saved: parseInt(saved as string),
              isSocialFundContribuited: socialFund === '1',
            },
            savingsGroupBeneficiary,
            user,
          ),
        );
    });
  } catch (e) {
    console.log(e);
    return 'form.error_retry';
  }
}

export async function createSavingsGroupMonitoring(
  params: CreateSavingsGroupMonitoringParserParams,
  savingsGroupId: string,
  username: string,
): Promise<void | TxKeyPath> {
  const {
    'cooperative-evolution': evolution,
    'cooperative-type': type,
    'gained-interest-savings': interestSavings,
    'gained-interest-social-fund': socialFund,
    'main-problems': mainProblems,
    cycle: cycleId,
  } = params;
  try {
    const user = await getUserByUsername(username);
    const savingsGroup = await database
      .get<SavingsGroup>(SavingsGroup.table)
      .find(savingsGroupId);
    const cycle = await database
      .get<Cycle>(Cycle.table)
      .find(cycleId as string);

    await database.write(async () => {
      await database
        .get<SavingsGroupMonitoring>(SavingsGroupMonitoring.table)
        .create(
          createSavingsGroupMonitoringRecord(
            {
              isCooperativeEvolved: evolution === '1',
              monitoringDate: new Date(),
              problems: mainProblems,
              savingsInterest: parseFloat(interestSavings as string),
              socialFundInterest: parseFloat(socialFund as string),
              type: type as string,
            },
            cycle,
            savingsGroup,
            user,
          ),
        );
    });
  } catch (err) {
    console.log(err);

    return 'form.error_retry';
  }
}
export async function createSavingsGroupMember(
  params: CreateSavingsGroupMemberParserParams,
  savingsGroupId: string,
  username: string,
): Promise<void | TxKeyPath> {
  const {
    'last-name': lastName,
    'first-name': firstName,
    'active-member': activeMember,
    'available-wealth': availableWealth,
    'birth-date': birthDate,
    'business-activity': businessActivity,
    'education-level': grade,
    'fine-value': fineValue,
    'living-with-parents': livingWithParents,
    'loan-interests': loanInterests,
    'loan-value': loanValue,
    'marital-status': maritalStatus,
    'number-of-children': numberOfChildren,
    'previous-credit-benefit': previousCreditBenefit,
    'savings-application': savingsApplication,
    'savings-value': savingsValue,
    'social-fund-value': socialFundValue,
    'why-gave-up': whyGaveUp,
    zone,
    cycle: cycleId,
  } = params;
  try {
    console.log('createSavingsGroupMember', {username});
    const user = await getUserByUsername(username);
    const savingsGroup = await database
      .get<SavingsGroup>(SavingsGroup.table)
      .find(savingsGroupId);

    const cycle = await database
      .get<Cycle>(Cycle.table)
      .find(cycleId as string);

    const beneficiary = await database
      .get<Beneficiary>(Beneficiary.table)
      .prepareCreate(
        createBeneficiaryRecord(
          {
            firstName,
            lastName,
            wealth: availableWealth,
            grade,
            maritalStatus,
            dateOfBirth: new Date(birthDate as string),
            motivoDesistencia: whyGaveUp,
            liveWithParents: livingWithParents === '1',
            numberOfChildren: parseInt(numberOfChildren as string),
            zone,
          },
          user,
        ),
      );

    const savingsGroupBeneficiary = database
      .get<SavingsGroupBeneficiary>(SavingsGroupMonitoring.table)
      .prepareCreate(
        createSavingsGroupBeneficiaryRecord(
          {
            activity: businessActivity,
            socialFund: parseFloat(socialFundValue as string),
            interest: parseFloat(loanInterests as string),
            loan: parseFloat(loanValue as string),
            savings: parseFloat(savingsValue as string),
            activeMember: activeMember === '1',
            creditBenefit: previousCreditBenefit,
            savingsApplication: savingsApplication,
            fine: parseFloat(fineValue as string),
          },
          cycle,
          savingsGroup,
          beneficiary,
          user,
        ),
      );
    await database.write(() => database.batch(beneficiary, savingsGroupBeneficiary));
  } catch (err) {
    console.log(err);

    return 'form.error_retry';
  }
}
