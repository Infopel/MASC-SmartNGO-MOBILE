import {
  createActionPlan,
  createActionPlanReport,
} from 'storage/mutations/action-plan.mutations';
import {createMonitoringVisit} from 'storage/mutations/monitoring-visit.mutations';
import {
  createSavingsGroupMember,
  createSavingsGroupMemberMonitoring,
  createSavingsGroupMonitoring,
} from 'storage/mutations/savings-group.mutations';
import logger from 'utils/logger';
import create, {StateCreator} from 'zustand';
import {findForm} from './form-fields';
import {IField, IBaseSubFormField, IFormStore} from './form.types';
import {createCivicIncubatorEvent} from './parser/create-civic-incubator-event';
import {createCivicIncubatorParticipant} from './parser/create-civic-incubator-participant';
import {createPeaceAmbassedorOrVdoActionParser} from './parser/create-peace-ambassador-or-vdo-action';
import {createPeaceAmbassedorOrVdoMemberParser} from './parser/create-peace-ambassador-or-vdo-member';
import {CreateSavingsGroupParser} from './parser/create-savings-group';
import {CreateTaskDiaryParser} from './parser/create-task-diary';
import {useUserStore} from 'store/user/user.store';
export const useFormStore: StateCreator<IFormStore> = create<IFormStore>()(
  (set, get) => ({
    form: undefined,
    subformOutputs: undefined,
    contextId: undefined,
    parentContextId: undefined,
    index: 0,
    page: () => {
      const form = get().form;

      if (!form) return undefined;
      const index = get().index;
      return {
        index: index,
        title: form.name,
        subTitle: form.steps[index].name,
        stepCount: form.steps.length,
      };
    },
    isMultiPage: () => {
      const form = get().form;

      if (!form) return false;
      return form.steps.length > 1;
    },
    nextPage: () => {
      const index = get().index;
      const form = get().form;
      if (!form) {
        logger.log('there is no form to goto next page');
        return;
      }
      if (index === form.steps.length - 1) return;
      set(state => ({...state, index: index + 1}));
    },
    clear: () => {
      set(() => ({
        index: 0,
        form: undefined,
        formType: undefined,
        contextId: undefined,
        subformOutputs: undefined,
      }));
    },
    prevPage: () => {
      const index = get().index;
      const form = get().form;
      if (!form) {
        logger.log('there is no form to goto previous page');
        return;
      }
      if (index === 0) return;
      set(state => ({...state, index: index - 1}));
    },
    isLastPage: () => {
      const index = get().index;
      const length: number = get().form?.steps.length ?? 0;

      if (length === 0) {
        return true;
      }
      return index === length - 1;
    },
    isFirstPage: () => {
      const index = get().index;
      return index === 0;
    },
    fields() {
      return get().form?.steps[get().index].fields ?? [];
    },

    getSubformFields(fieldName: string) {
      const currFields = get().form?.steps[get().index].fields;
      const field = currFields?.find(({id}) => fieldName === id) as
        | IBaseSubFormField
        | undefined;
      if (field) {
        return field.fields;
      }
      return [] as IField[];
    },

    submitForm(data: any) {
      const {formType, contextId} = get();
      const user = useUserStore.getState().user;

      if (!formType) {
        throw new Error(`Cannot submit form without a form type', {
        formType:${formType}
      }`);
      }
      switch (formType) {
        case 'savings-group':
          return CreateSavingsGroupParser(data, user);
        case 'civic-incubator-participant':
          if (throwIfContextInvalid(contextId))
            return createCivicIncubatorParticipant(data, contextId, user);
        case 'pa-or-vdo-member':
          if (throwIfContextInvalid(contextId))
            return createPeaceAmbassedorOrVdoMemberParser(
              data,
              contextId,
              user,
            );
        case 'civic-incubator-events':
          if (throwIfContextInvalid(contextId))
            return createCivicIncubatorEvent(data, contextId, user);
        case 'pa-or-vdo-action':
          if (throwIfContextInvalid(contextId))
            return createPeaceAmbassedorOrVdoActionParser(
              data,
              contextId,
              user,
            );
        case 'task-diary':
          if (throwIfContextInvalid(contextId))
            return CreateTaskDiaryParser(data, contextId, user);
        case 'action-plan':
          if (throwIfContextInvalid(contextId))
            return createActionPlan(data, contextId, user);
        case 'report-action-plan-progress':
          if (throwIfContextInvalid(contextId))
            return createActionPlanReport(data, contextId, user);
        case 'monitoring-visits':
          if (throwIfContextInvalid(contextId))
            return createMonitoringVisit(data, contextId, user);
        case 'savings-group-member-monitoring':
          if (throwIfContextInvalid(contextId))
            return createSavingsGroupMemberMonitoring(data, contextId, user);
        case 'savings-group-monitoring':
          if ((throwIfContextInvalid(contextId), user))
            return createSavingsGroupMonitoring(data, contextId, user);
        case 'savings-group-member':
          if (throwIfContextInvalid(contextId))
            return createSavingsGroupMember(data, contextId, user);
        default:
          throw new Error(
            `Submission for form type '${formType}' is not implemented`,
          );
      }
    },
    requestForm(type, contextId, parentContextId) {
      const form = findForm(type);
      if (!form) {
        set(() => ({
          form: undefined,
        }));
      } else
        set(state => ({
          form,
          formType: type,
          contextId,
          parentContextId,
        }));
    },
  }),
);

function throwIfContextInvalid(arg: any): arg is string {
  if (!arg) {
    throw new Error(`Cannot submit form without a form type or context', {
      context:${arg},
    }`);
  }
  return true;
}
