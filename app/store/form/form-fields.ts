import {IForm, IFormType} from './form.types';

type IFormSteps = {
  [x in IFormType]: IForm;
};

const forms: IFormSteps = {
  'action-plan': {
    name: 'form.action-plan.title',
    steps: [
      {
        name: 'form.action-plan.title',
        fields: [
          {
            name: 'form.action-plan.name',
            type: 'text',
            validation: {required: true},
            id: 'name',
          },
          {
            name: 'form.action-plan.start-date',
            type: 'date',
            validation: {required: true},
            id: 'start-date',
          },
          {
            name: 'form.action-plan.end-date',
            type: 'date',
            validation: {required: true},
            id: 'end-date',
          },
        ],
      },
    ],
  },
  'report-action-plan-progress': {
    name: 'form.report-action-plan-progress.title',
    steps: [
      {
        name: 'form.report-action-plan-progress.title',
        fields: [
          {
            name: 'form.report-action-plan-progress.start-date',
            type: 'date',
            validation: {required: true},
            id: 'start-date',
          },
          {
            name: 'form.report-action-plan-progress.end-date',
            type: 'date',
            validation: {required: true},
            id: 'end-date',
          },
          {
            name: 'form.report-action-plan-progress.done-ratio',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive', max: 100},
            id: 'done-ratio',
          },
          {
            name: 'form.report-action-plan-progress.observations',
            type: 'text',
            validation: {required: true},
            id: 'observations',
          },
        ],
      },
    ],
  },
  'monitoring-visits': {
    name: 'form.monitoring-visits.title',
    steps: [
      {
        name: 'form.monitoring-visits.title',
        fields: [
          {
            name: 'form.monitoring-visits.type',
            type: 'radio',
            validation: {required: true},
            items: [
              {id: '1', name: 'levantamento de necessidades'},
              {id: '2', name: 'ausculta????o do grupo'},
            ],
            id: 'type',
          },
          {
            name: 'form.monitoring-visits.date',
            type: 'date',
            validation: {required: true},
            id: 'date',
          },
          {
            name: 'form.monitoring-visits.motive',
            type: 'text',
            validation: {required: true},
            id: 'motive',
          },
        ],
      },
    ],
  },
  'savings-group-member-quitting': {
    name: 'form.savings-group-member-quitting.title',
    steps: [
      {
        name: 'form.savings-group-member-quitting.title',
        fields: [
          {
            name: 'form.savings-group-member-quitting.motivation',
            type: 'text',
            validation: {required: true},
            id: 'motivation',
          },
          {
            name: 'form.savings-group-member-quitting.date',
            type: 'date',
            validation: {required: true},
            id: 'date',
          },
        ],
      },
    ],
  },
  'savings-group-member-monitoring': {
    name: 'form.savings-group-member-monitoring.title',
    steps: [
      {
        name: 'form.savings-group-member-monitoring.title',
        fields: [
          {
            name: 'form.savings-group-member-monitoring.saved-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'saved-value',
          },
          {
            name: 'form.savings-group-member-monitoring.loan-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'loan-value',
          },
          {
            name: 'form.savings-group-member-monitoring.interest-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'interest-value',
          },
          {
            name:
              'form.savings-group-member-monitoring.social-fund-contribuition',
            type: 'radio',
            validation: {required: true},
            items: [
              {id: '1', name: 'Sim'},
              {id: '2', name: 'Nao'},
            ],
            id: 'social-fund-contribuition',
          },
          {
            name: 'form.savings-group-member-monitoring.date',
            type: 'date',
            validation: {required: true},
            id: 'date',
          },
        ],
      },
    ],
  },
  'savings-group-member': {
    name: 'form.pa-or-vdo-member.title',
    steps: [
      {
        name: 'form.savings-group-member.step-1',
        fields: [
          {
            name: 'form.savings-group-member.first-name',
            type: 'text',
            validation: {required: true},
            id: 'first-name',
          },
          {
            name: 'form.savings-group-member.last-name',
            type: 'text',
            validation: {required: true},
            id: 'last-name',
          },
          {
            name: 'form.savings-group-member.birth-date',
            type: 'date',
            validation: {required: true},
            id: 'birth-date',
          },
          {
            name: 'form.savings-group-member.marital-status',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: '1', name: 'Solteiro'},
              {id: '2', name: 'Casado'},
            ],
            id: 'marital-status',
          },
          {
            name: 'form.savings-group-member.zone',
            type: 'text',
            validation: {required: true},
            id: 'zone',
          },
          {
            name: 'form.savings-group-member.education-level',
            type: 'text',
            validation: {required: true},
            id: 'education-level',
          },
          {
            name: 'form.savings-group-member.number-of-children',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
            id: 'number-of-children',
          },

          {
            name: 'form.savings-group-member.living-with-parents',
            type: 'radio',
            validation: {required: true},
            items: [
              {id: '1', name: 'Sim'},
              {id: '2', name: 'Nao'},
            ],
            id: 'living-with-parents',
          },
        ],
      },
      {
        name: 'form.savings-group-member.step-2',
        fields: [
          {
            name: 'form.savings-group-member.cycle',
            type: 'selector',
            validation: {required: true},
            items: 'CYCLE',
            id: 'cycle',
          },
          {
            name: 'form.savings-group-member.savings-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'savings-value',
          },
          {
            name: 'form.savings-group-member.loan-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'loan-value',
          },
          {
            name: 'form.savings-group-member.loan-interests',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'loan-interests',
          },
          {
            name: 'form.savings-group-member.fine-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'fine-value',
          },
          {
            name: 'form.savings-group-member.social-fund-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'social-fund-value',
          },

          {
            name: 'form.savings-group-member.business-activity',
            type: 'text',
            validation: {required: true},
            id: 'business-activity',
          },
          {
            name: 'form.savings-group-member.savings-application',
            type: 'text',
            validation: {required: true},
            id: 'savings-application',
          },
          {
            name: 'form.savings-group-member.previous-credit-benefit',
            type: 'text',
            validation: {required: true},
            id: 'previous-credit-benefit',
          },
        ],
      },
    ],
  },
  'savings-group-monitoring': {
    name: 'form.savings-group-monitoring.title',
    //     ???	C??digo do membro: gerado automaticamente, concatenando c??digo do grupo e n??mero incremental;
    // ???	NOME DO MEMBRO: caixa de texto;
    // ???	Data de nascimento: campo de selec????o de data;
    // ???	ESTADO CIVIL: caixa de selec????o ??nica com lista de estados civis;
    // ???	FUN????O: caixa de selec????o ??nica com op????es l??der religioso, l??der comunit??rio, outro (especificar qual);
    // ???	NIVEL DE ESCOLARIDADE: caixa de texto;
    // ???	?? MEMBRO ACTIVO: caixa de selec????o com op????es sim | n??o;
    // ???	Caso preencha n??o:
    // o	PORQU??  DESISTIU: caixa de texto longo;

    steps: [
      {
        name: 'form.savings-group-monitoring.title',
        fields: [
          {
            name: 'form.savings-group-monitoring.gained-interest-savings',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'gained-interest-savings',
          },
          {
            name: 'form.savings-group-monitoring.cycle',
            type: 'selector',
            validation: {required: true},
            items: 'CYCLE',
            id: 'cycle',
          },
          {
            name: 'form.savings-group-monitoring.gained-interest-social-fund',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'gained-interest-social-fund',
          },
          {
            name: 'form.savings-group-monitoring.cooperative-evolution',
            type: 'radio',
            validation: {required: true},
            items: [
              {id: '1', name: 'Sim'},
              {id: '2', name: 'Nao'},
            ],
            id: 'cooperative-evolution',
          },
          {
            name: 'form.savings-group-monitoring.cooperative-type',
            type: 'text',
            validation: {required: true},
            id: 'cooperative-type',
          },
          {
            name: 'form.savings-group-monitoring.main-problems',
            type: 'text',
            validation: {required: true, contentType:'long-text'},
            id: 'main-problems',
          },
        ],
      },
    ],
  },
  'pa-or-vdo-member': {
    name: 'form.pa-or-vdo-member.title',
    //     ???	C??digo do membro: gerado automaticamente, concatenando c??digo do grupo e n??mero incremental;
    // ???	NOME DO MEMBRO: caixa de texto;
    // ???	Data de nascimento: campo de selec????o de data;
    // ???	ESTADO CIVIL: caixa de selec????o ??nica com lista de estados civis;
    // ???	FUN????O: caixa de selec????o ??nica com op????es l??der religioso, l??der comunit??rio, outro (especificar qual);
    // ???	NIVEL DE ESCOLARIDADE: caixa de texto;
    // ???	?? MEMBRO ACTIVO: caixa de selec????o com op????es sim | n??o;
    // ???	Caso preencha n??o:
    // o	PORQU??  DESISTIU: caixa de texto longo;

    steps: [
      {
        name: 'form.pa-or-vdo-member.title',
        fields: [
          // {
          //   name: "form.pa-or-vdo-member.member-code",
          //   type: "text",
          //   id: "member-code",
          // },
          {
            name: 'form.pa-or-vdo-member.first-name',
            type: 'text',
            validation: {required: true},
            id: 'first-name',
          },
          {
            name: 'form.pa-or-vdo-member.last-name',
            type: 'text',
            validation: {required: true},
            id: 'last-name',
          },
          {
            name: 'form.pa-or-vdo-member.marital-status',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: 'Solteiro', name: 'Solteiro/a'},
              {id: 'Casado', name: 'Casada/a'},
              {id: 'Vi??vo', name: 'Vi??vo/a'},
              {id: 'Divorciado', name: 'Divorciado/a'},
              {id: 'Separado', name: 'Separado/a'},
            ],
            id: 'marital-status',
          },

          {
            name: 'form.pa-or-vdo-member.occupation',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: 'L??der Religioso', name: 'L??der Religioso'},
              {id: 'L??der Comunit??rio', name: 'L??der Comunit??rio'},
              {id: 'outro', name: 'outro'},
            ],
            id: 'occupation',
          },
          {
            name: 'form.pa-or-vdo-member.education-level',
            type: 'text',
            validation: {required: true},
            id: 'education-level',
          },
          {
            name: 'form.pa-or-vdo-member.active-member',
            type: 'radio',
            validation: {required: true},
            id: 'active-member',
            items: [
              {id: '1', name: 'Sim'},
              {id: '2', name: 'Nao'},
            ],
          },
          {
            name: 'form.pa-or-vdo-member.why-gave-up',
            type: 'text',
            validation: {required: true, contentType:'long-text'},
            id: 'why-gave-up',
          },
        ],
      },
    ],
  },
  'pa-or-vdo-action': {
    name: 'form.pa-or-vdo-action.title',
    // ???	Data de realiza????o: caixa de selec????o de data;
    // ???	Tipo de ac????o: caixa de selec????o com op????es forma????o | reuni??o regular | mesa redonda, ac????es de advocacia | peti????es | outro (especificar qual);
    // ???	Nome da ac????o: caixa de texto;
    // ???	Objectivo da ac????o: caixa de texto;
    // ???	Coordenador da ac????o: caixa de texto;
    // ???	Nr de Participantes (Homens): caixa num??rica;
    // ???	Nr de Participantes (Mulheres): caixa num??rica;
    // ???	Observa????es: caixa de texto longo;

    steps: [
      {
        name: 'form.pa-or-vdo-action.title',
        fields: [
          {
            name: 'form.pa-or-vdo-action.realization-date',
            type: 'date',
            validation: {required: true},
            id: 'realization-date',
          },

          {
            name: 'form.pa-or-vdo-action.type',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: '1', name: 'Forma????o'},
              {id: '2', name: 'Reuni??o regular'},
              {id: '3', name: 'Mesa redonda'},
              {id: '4', name: 'Ac????es de advocacia '},
              {id: '5', name: 'Peti????es'},
              {id: '6', name: 'Outro'},
            ],
            id: 'type',
          },
          {
            name: 'form.pa-or-vdo-action.name',
            id: 'name',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.pa-or-vdo-action.goal',
            id: 'goal',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.pa-or-vdo-action.coordinator',
            id: 'coordinator',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.pa-or-vdo-action.number_of_participants_male',
            id: 'number_of_participants_male',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
          },
          {
            name: 'form.pa-or-vdo-action.number_of_participants_female',
            id: 'number_of_participants_female',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
          },
          {
            name: 'form.pa-or-vdo-action.observations',
            id: 'observations',
            type: 'text',
            validation: {required: true},
          },
        ],
      },
    ],
  },
  'civic-incubator-participant': {
    name: 'form.civic-incubator-participant.title',
    steps: [
      {
        name: 'form.civic-incubator-participant.title',
        fields: [
          {
            name: 'form.civic-incubator-participant.first-name',
            type: 'text',
            validation: {required: true},
            id: 'first-name',
          },
          {
            name: 'form.civic-incubator-participant.last-name',
            type: 'text',
            validation: {required: true},
            id: 'last-name',
          },
          {
            name: 'form.civic-incubator-participant.birth-date',
            type: 'date',
            validation: {required: true},
            id: 'birth-date',
          },

          {
            name: 'form.civic-incubator-participant.gender',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: 'M', name: 'Masculino'},
              {id: 'F', name: 'Feminino'},
            ],
            id: 'gender',
          },
          {
            name: 'form.civic-incubator-participant.marital-status',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: 'Solteiro', name: 'Solteiro/a'},
              {id: 'Casado', name: 'Casada/a'},
              {id: 'Vi??vo', name: 'Vi??vo/a'},
              {id: 'Divorciado', name: 'Divorciado/a'},
              {id: 'Separado', name: 'Separado/a'},
            ],
            id: 'marital-status',
          },
          {
            name: 'form.civic-incubator-participant.education-level',
            type: 'text',
            validation: {required: true},
            id: 'education-level',
          },
          {
            name: 'form.civic-incubator-participant.occupation',
            id: 'ocupation',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.civic-incubator-participant.conhecimentoIncubadora',
            id: 'conhecimentoIncubadora',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.civic-incubator-participant.conhecimentoEspaco',
            id: 'conhecimentoEspaco',
            type: 'radio',
            validation: {required: true},
            items: [
              {id: '1', name: 'Sim'},
              {id: '2', name: 'Nao'},
            ],
          },
          {
            name: 'form.civic-incubator-participant.participacaoEspaco',
            dependOn: 'conhecimentoEspaco',
            dependOnVisibleValue: '1',
            id: 'participacaoEspaco',
            type: 'selector',
            validation: {required: true},
            items: [
              {
                id: 'Observat??rio De Desenvolvimento',
                name: 'Observat??rio De Desenvolvimento',
              },
              {id: 'Conselho Consultivo', name: 'Conselho Consultivo'},
              {id: 'Comit?? De Cogest??o', name: 'Comit?? De Cogest??o'},
              {id: 'Conselho De Escola', name: 'Conselho De Escola'},
              {id: 'Comit?? De ??gua', name: 'Comit?? De ??gua'},
            ],
          },
          {
            name: 'form.civic-incubator-participant.actividadePolitica',
            id: 'actividadePolitica',
            type: 'radio',
            validation: {required: true},
            items: [
              {id: '1', name: 'Sim'},
              {id: '2', name: 'Nao'},
            ],
          },
          {
            name: 'form.civic-incubator-participant.observations',
            id: 'observations',
            type: 'text',
            validation: {required: true},
          },
        ],
      },
    ],
  },
  'savings-group': {
    name: 'form.savings-group.title',
    steps: [
      {
        name: 'form.savings-group.title',
        fields: [
          {
            name: 'form.savings-group.name',
            type: 'text',
            validation: {required: true},
            id: 'name',
          },
          {
            name: 'form.savings-group.province',
            type: 'selector',
            validation: {required: true},
            items: 'PROVINCE',
            id: 'province',
          },
          {
            name: 'form.savings-group.district',
            type: 'selector',
            validation: {required: true},
            items: 'DISTRICT',
            helperText: 'form.savings-group.select-province',
            queryFrom: 'province',
            id: 'district',
          },
          {
            name: 'form.savings-group.zone',
            type: 'text',
            validation: {required: true},
            id: 'zone',
          },

          {
            name: 'form.savings-group.date-of-constitution',
            type: 'date',
            validation: {required: true},
            id: 'date-of-constitution',
          },
          {
            name: 'form.savings-group.social-fund-value',
            type: 'text',
            validation: {required: true,  contentType: 'decimal-positive'},
            id: 'social-fund-value',
          },
          {
            name: 'form.savings-group.interests-fee',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'interests-fee',
          },
          {
            name: 'form.savings-group.fine-value',
            type: 'text',
            validation: {required: true, contentType: 'decimal-positive'},
            id: 'fine-value',
          },
          {
            name: 'form.savings-group.number-of-active-members',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
            id: 'number-of-active-members',
          },

          {
            name: 'form.savings-group.number-of-members',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
            id: 'number-of-members',
          },

          {
            name: 'form.cycles.title',
            type: 'sub-form',
            validation: {required: true},
            id: 'cycles',
            fields: [
              {
                name: 'form.cycles.cycles-name',
                type: 'text',
                validation: {required: true},
                id: 'cycles-name',
              },
              {
                name: 'form.cycles.cycles-start-date',
                type: 'date',
                validation: {required: true},
                id: 'cycles-start-date',
              },
              {
                name: 'form.cycles.cycles-end-date',
                type: 'date',
                validation: {required: true},
                id: 'cycles-end-date',
              },
            ],
          },
        ],
      },
    ],
  },
  'civic-incubator-events': {
    name: 'form.civic-incubator-participant.title',

    // ???	Data de realiza????o: caixa de selec????o de data;
    // ???	Tipo de sec????o: caixa de selec????o com op????es palestra | oficina tem??tica | forma????o | conversas que inspiram | outro (especificar qual);
    // ???	Nome da sec????o: caixa de texto;
    // ???	Assunto abordado: caixa de texto;
    // ???	Coordenador / palestrante da sec????o: caixa de texto;
    // ???	Nr de Jovens Participantes (Homens): caixa num??rica;
    // ???	Nr de Jovens Participantes (Mulheres): caixa num??rica;
    // ???	Ac????es Desenvolvidas: caixa de texto longo;
    // ???	Resultados da Ac????o: caixa de selec??ao m??ltipla com op????es evoluiu para associa????o | jovens participam no espa??o de tomada de decis??o | jovens submetem peti????es | outros (especificar qual);
    // ???	Observa????es: caixa de texto longo;

    steps: [
      {
        name: 'form.civic-incubator-events.title',
        fields: [
          {
            name: 'form.civic-incubator-events.realization_date',
            type: 'date',
            validation: {required: true},
            id: 'realization_date',
          },
          {
            name: 'form.civic-incubator-events.type',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: '1', name: 'palestra'},
              {id: '2', name: 'oficina tem??tica'},
              {id: '3', name: 'conversas que inspiram'},
              {id: '4', name: 'forma????o'},
              {id: '5', name: 'conversas que inspiram'},
              {id: '6', name: 'outro'},
            ],
            id: 'type',
          },
          {
            name: 'form.civic-incubator-events.type_other',
            dependOn: 'section_type',
            dependOnVisibleValue: '6',
            type: 'text',
            validation: {required: true},
            id: 'section_type_other',
          },

          {
            name: 'form.civic-incubator-events.name',
            type: 'text',
            validation: {required: true},
            id: 'name',
          },

          {
            name: 'form.civic-incubator-events.subject',
            type: 'text',
            validation: {required: true},
            id: 'subject',
          },
          {
            name: 'form.civic-incubator-events.coordinator',
            type: 'text',
            validation: {required: true},
            id: 'coordinator',
          },
          {
            name: 'form.civic-incubator-events.number_of_participants_male',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
            id: 'number_of_participants_female',
          },
          {
            name: 'form.civic-incubator-events.number_of_participants_female',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
            id: 'number_of_participants_male',
          },
          {
            name: 'form.civic-incubator-events.developed_actions',
            type: 'text',
            validation: {required: true},
            id: 'developed_actions',
          },
          {
            name: 'form.civic-incubator-events.action_results',
            type: 'selector',
            validation: {required: true},
            items: [
              {id: '1', name: 'evoluiu para associa????o'},
              {
                id: '2',
                name: 'jovens participam no espa??o de tomada de decis??o',
              },
              {id: '3', name: 'jovens submetem peti????es'},
              {id: 'Divorciado', name: 'outros'},
            ],
            id: 'action_results',
          },

          {
            name: 'form.civic-incubator-events.action_results_other',
            dependOn: 'action_results',
            dependOnVisibleValue: '1',
            id: 'action_results_other',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.civic-incubator-participant.observations',
            type: 'text',
            validation: {required: true, contentType: 'long-text'},
            id: 'observations',
          },
        ],
      },
    ],
  },
  'task-diary': {
    name: 'form.task-diary.title',
    steps: [
      {
        name: 'form.task-diary.step-1',
        fields: [
          {
            name: 'form.task-diary.name',
            type: 'text',
            validation: {required: true},
            id: 'name',
          },
          {
            name: 'form.task-diary.task-objetive',
            type: 'text',
            validation: {required: true},
            id: 'task-objetive',
          },
          {
            name: 'form.task-diary.date-start',
            type: 'date',
            validation: {required: true},
            id: 'start-date',
          },
          {
            name: 'form.task-diary.date-end',
            type: 'date',
            validation: {required: true},
            id: 'date-end',
          },
        ],
      },
      {
        name: 'form.task-diary.step-2',
        fields: [
          {
            name: 'form.task-diary.meeting-description',
            id: 'meeting-description',
            type: 'text',
            validation: {required: true, contentType: 'long-text'},
          },
          {
            name: 'form.task-diary.imidiact-result',
            id: 'imidiact-result',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.who-to-inform',
            id: 'who-to-inform',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.challenges-n-lesson',
            id: 'challenges-n-lesson',
            type: 'text',
            validation: {required: true, contentType: 'long-text'},
          },
          {
            name: 'form.task-diary.next-steps',
            id: 'next-steps',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.masc-contribuition',
            id: 'masc-contribuitions',
            type: 'text',
            validation: {required: true},
          },
        ],
      },
      {
        name: 'form.task-diary.step-3',
        fields: [
          {
            name: 'form.task-diary.evidence-type',
            id: 'evidence-type',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.verification-methods',
            id: 'verification-methods',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.number-of-males',
            id: 'number-of-males',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
          },
          {
            name: 'form.task-diary.number-of-females',
            id: 'number-of-females',
            type: 'text',
            validation: {required: true, contentType: 'number-positive'},
          },
          {
            name: 'form.task-diary.generic-comments',
            id: 'generic-comments',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.image-evidences',
            id: 'image-evidences',
            type: 'image',
            validation: {required: true},
          },
        ],
      },
      {
        name: 'form.task-diary.step-4',
        fields: [
          {
            name: 'form.task-diary.indicator',
            id: 'indicator',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.goal',
            id: 'goal',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.type-of-goal',
            id: 'type-of-goal',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.verification-source',
            id: 'verification-source',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.realized',
            id: 'realized',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.text-evidences',
            id: 'text-evidences',
            type: 'text',
            validation: {required: true},
          },
          {
            name: 'form.task-diary.Upload',
            id: 'upload',
            type: 'image',
            validation: {required: true},
          },
        ],
      },
    ],
  },
};

export function findForm(type: IFormType): IForm {
  return forms[type];
}
