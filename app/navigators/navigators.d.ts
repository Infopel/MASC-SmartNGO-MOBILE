import {MaterialTopTabDescriptorMap} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {
  NavigationHelpers,
  NavigationProp,
  NavigationState,
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
  TabNavigationState,
  useNavigationState as useNavState,
} from '@react-navigation/native';
import {StackHeaderProps, StackNavigationProp} from '@react-navigation/stack';
import {HomeNavigatorBottomBarProps} from 'components/home-navigator-bottom-bar/home-navigator-bottom-bar';
import {TxKeyPath} from 'i18n/i18n';
import {SceneRendererProps} from 'react-native-tab-view';
import {IFormType} from 'store/form';

type NavParams = Record<TxKeyPath, object | undefined>;

export type HomeBottomTabNavigatorParamList = {
  home: undefined;
  search: undefined;
  settings: undefined;
  sync: undefined;
  stats: undefined;
};
type PeaceAmbassadorsAndVdoRoute = {type: 'vdo' | 'peace-ambassadors'};
export type PrimaryNavigatorParamList = {
  'home-bottom-tabs': NavigatorScreenParams<HomeNavigatorBottomBarProps>;
  'my-tasks': undefined;
  form: {formId: IFormType; contextId?: string, parentContextId?: string};
  'civic-incubators': undefined;
  'new-civic-incubator': undefined;
  'savings-group': undefined;
  'new-savings-group': undefined;
  'civic-incubator-details': {incubatorId: string};
  'action-plan': {initiativeId: string};
  'monitoring-visits': {initiativeId: string};
  'savings-group-details': {id: string};
  'peace-ambassadors-and-vdo': PeaceAmbassadorsAndVdoRoute;
  'new-peace-ambassadors-and-vdo': PeaceAmbassadorsAndVdoRoute;
  'peace-ambassadors-and-vdo-details': PeaceAmbassadorsAndVdoRoute & {
    incubatorId: string;
  };
};

export type SavingsGroupDetailsTabNavigatorParamList = {
  'savings-group-details-monitoring': undefined;
  'savings-group-details-members': undefined;
};

export type AuthNavigatorParamList = {
  login: undefined;
};

export type ScreenNavigationProps<T extends keyof NavigatorParamList> = {
  navigation: NavigationProp<NavigatorParamList, T>;
  route: RouteProp<NavigatorParamList, T>;
};

export interface PrimaryStackHeaderProps<T extends keyof NavigatorParamList>
  extends StackHeaderProps {
  navigation: StackNavigationProp<NavigatorParamList, T>;
  route: RouteProp<NavigatorParamList, T>;
}

export type AppNavigatorParamList = {
  auth: undefined;
  primary: undefined;
};

export type CivicIncubatorDetailsTabNavigatorParamList = {
  'civic-incubator-details-participants-tab': undefined;
  'civic-incubator-details-events-tab': undefined;
};

export type NavigatorParamList = AppNavigatorParamList &
  PrimaryNavigatorParamList &
  HomeBottomTabNavigatorParamList &
  CivicIncubatorDetailsTabNavigatorParamList & SavingsGroupDetailsTabNavigatorParamList;

type PeaceAmbassadorsAndVdoRouteProp = RouteProp<
  NavigatorParamList,
  | 'peace-ambassadors-and-vdo'
  | 'peace-ambassadors-and-vdo-details'
  | 'new-peace-ambassadors-and-vdo'
>;

export declare type TabBarProps = SceneRendererProps & {
  state: TabNavigationState<NavParams>;
  navigation: NavigationHelpers<NavParams>;
  descriptors: MaterialTopTabDescriptorMap;
};

export function isPeaceAmbassadorsAndVdoRoute(
  arg: RouteProp<NavigatorParamList>,
): arg is PeaceAmbassadorsAndVdoRouteProp {
  if (!arg.params) return false;
  return (
    (<PeaceAmbassadorsAndVdoRoute>arg.params).type === 'vdo' ||
    (<PeaceAmbassadorsAndVdoRoute>arg.params).type === 'peace-ambassadors'
  );
}
type Selector<T> = (state: NavigationState<NavigatorParamList>) => T;
export function useNavigationState<T>(selector: Selector<T>) {
  return useNavState(selector);
}
