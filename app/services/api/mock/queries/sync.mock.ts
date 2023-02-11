import {DEFAULT_API_CONFIG} from 'api/api-config';
import {paths} from 'api/api-params';
import {rest} from 'msw';
import {ApiChanges} from './../../api.types';
import {db, location} from './seed';
const url = DEFAULT_API_CONFIG.url;

export default [
  rest.get(url + paths.sync.pull, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        timestamp: 161258742685,
        changes: {
          iniciativa: {
            created: db.iniciativa.getAll(),
            deleted: [],
            updated: [],
          },
          Localizacao: {
            created: location,
            deleted: [],
            updated: [],
          },
          users: {
            created: db.user.getAll(),
            deleted: [],
            updated: [],
          },
          issues: {
            created: db.issues.getAll(),
            deleted: [],
            updated: [],
          },
          time_entries: {
            created: db.time_entries.getAll(),
            deleted: [],
            updated: [],
          },
          projects: {
            created: db.projects.getAll(),
            deleted: [],
            updated: [],
          },
          tipoaccao: {
            created: [],
            deleted: [],
            updated: [],
          },
          beneficiario: {
            created: db.beneficiario.getAll(),
            deleted: [],
            updated: [],
          },
          participantesaccao: {
            created: [],
            deleted: [],
            updated: [],
          },
          beneficiarioiniciativa: {
            created: db.beneficiario_iniciativa.getAll(),
            deleted: [],
            updated: [],
          },
          monitoriagrupo: {
            created: db.monitoriagrupo.getAll(),
            deleted: [],
            updated: [],
          },
          ciclo: {created: db.ciclo.getAll(), deleted: [], updated: []},
          poupancabeneficiario: {
            created: db.poupancabeneficiario.getAll(),
            deleted: [],
            updated: [],
          },
          accao: {
            created: [],
            deleted: [],
            updated: [],
          },
          planoaccao: {
            created: db.planoaccao.getAll(),
            deleted: [],
            updated: [],
          },
          reporteplanoaccao: {
            created: db.reporteplanoaccao.getAll(),
            deleted: [],
            updated: [],
          },
          visitamonitoria: {
            created: db.visitamonitoria.getAll(),
            deleted: [],
            updated: [],
          },
          grupopoupanca: {
            created: db.savingGroup.getAll(),
            deleted: [],
            updated: [],
          },
          monitoriapoupanca: {
            created: [],
            deleted: [],
            updated: [],
          },
        } as ApiChanges,
      }),
    );
  }),
  rest.post(url + paths.sync.push, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
