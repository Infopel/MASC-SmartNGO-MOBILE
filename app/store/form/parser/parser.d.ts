import keys from 'i18n/en';
type MappedFromLangJson<T extends Omit<object, 'title'>> = {
  [Property in keyof T]: string | null;
};

/***SECTION - TASK DIARY*/
type CreateTaskDiaryParserParams = Omit<
  MappedFromLangJson<typeof keys.form['task-diary']>,
  'title' | 'step-1' | 'step-2' | 'step-3' | 'step-4'
>;

/***SECTION -  PEACE AMBASSADOR / VDO */
type CreatePeaceAmbassedorOrVdoActionParams = MappedFromLangJson<
  typeof keys.form['pa-or-vdo-action']
>;
type CreatePeaceAmbassedorOrVdoMemberParams = MappedFromLangJson<
  typeof keys.form['pa-or-vdo-member']
>;

/***SECTION - CIVIC INCUBATOR */
type CreateCivicIncubatorParticipantParserParams = MappedFromLangJson<
  typeof keys.form['civic-incubator-participant']
>;

type CreateCivicIncubatorEventParserParams = MappedFromLangJson<
  typeof keys.form['civic-incubator-events']
>;

/***SECTION - SAVINGS GROUP */
type CreateSavingsGroupMemberParserParams = MappedFromLangJson<
  typeof keys.form['savings-group-member']
>;
type CreateSavingsGroupMonitoringParserParams = MappedFromLangJson<
  typeof keys.form['savings-group-monitoring']
>;

type CreateSavingsGroupParserParams = MappedFromLangJson<
typeof keys.form['savings-group']> & {cycles: MappedFromLangJson<typeof keys.form['cycles']>[]}

type CreateSavingsGroupMemberMonitoringParserParams = MappedFromLangJson<
  typeof keys.form['savings-group-member-monitoring']
>;
type CreateSavingsGroupMemberQuttingParserParams = MappedFromLangJson<
  typeof keys.form['savings-group-member-quitting']
>;

/***SECTION - ACTION PLAN */
type CreateActionPlanParserParams = MappedFromLangJson<
  typeof keys.form['action-plan']
>;
type CreateReportActionPlanProgressParserParams = MappedFromLangJson<
  typeof keys.form['report-action-plan-progress']
>;

/***SECTION - MONITORING VISITS */
type CreateMonitoringVisitsParserParams = MappedFromLangJson<
  typeof keys.form['monitoring-visits']
>;
