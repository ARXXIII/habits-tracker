import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { HabitLean } from '../models/habit';
import type { HabitLogLean } from '../models/habit-log';
import type { UserLean } from '../models/user';
import type { GraphQLContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  ObjectId: { input: string; output: string; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type CreateHabitInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  regularity?: InputMaybe<Regularity>;
  title: Scalars['String']['input'];
};

export type CreteHabitResult = Habit | HabitAlreadyExistsError | UserNotFoundError;

export type DeleteHabitResult = Habit | HabitNotFoundError | UserNotFoundError;

export type Habit = {
  __typename?: 'Habit';
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  habitLogs: Array<HabitLog>;
  id: Scalars['ObjectId']['output'];
  regularity?: Maybe<Regularity>;
  title: Scalars['String']['output'];
  userId: Scalars['ObjectId']['output'];
};

export type HabitAlreadyExistsError = {
  __typename?: 'HabitAlreadyExistsError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type HabitLog = {
  __typename?: 'HabitLog';
  createdAt: Scalars['Date']['output'];
  habitId: Scalars['ObjectId']['output'];
  id: Scalars['ObjectId']['output'];
  status?: Maybe<Status>;
};

export type HabitLogAlreadyExistsError = {
  __typename?: 'HabitLogAlreadyExistsError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type HabitLogResult = HabitLog | HabitLogAlreadyExistsError | HabitNotFoundError;

export type HabitNotFoundError = {
  __typename?: 'HabitNotFoundError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type HabitResult = Habit | HabitNotFoundError | UserNotFoundError;

export type InvalidInputError = {
  __typename?: 'InvalidInputError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type InvalidRefreshTokenError = {
  __typename?: 'InvalidRefreshTokenError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type LoginResult = AuthPayload | InvalidInputError | UserNotFoundError;

export type Mutation = {
  __typename?: 'Mutation';
  createHabit: CreteHabitResult;
  createHabitLog: HabitLogResult;
  deleteHabit: DeleteHabitResult;
  deleteUser: UserResult;
  login: LoginResult;
  logout: Scalars['Boolean']['output'];
  refresh: RefreshTokenResult;
  register: RegisterResult;
  updateUser: UserResult;
};


export type MutationCreateHabitArgs = {
  input: CreateHabitInput;
};


export type MutationCreateHabitLogArgs = {
  habitId: Scalars['ObjectId']['input'];
  status?: InputMaybe<Status>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  token: Scalars['String']['input'];
};


export type MutationRefreshArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  habit: HabitResult;
  habitLogs: Array<HabitLog>;
  habits: Array<Habit>;
  user: UserResult;
  users: Array<User>;
};


export type QueryHabitArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryHabitLogsArgs = {
  habitId: Scalars['ObjectId']['input'];
};


export type QueryHabitsArgs = {
  userId: Scalars['ObjectId']['input'];
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type RefreshTokenNotFoundError = {
  __typename?: 'RefreshTokenNotFoundError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type RefreshTokenResult = InvalidRefreshTokenError | RefreshPayload | RefreshTokenNotFoundError;

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResult = AuthPayload | UserAlreadyExistsError;

export enum Regularity {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export enum Status {
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  habits: Array<Habit>;
  id: Scalars['ObjectId']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type UserAlreadyExistsError = {
  __typename?: 'UserAlreadyExistsError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type UserResult = User | UserNotFoundError;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  CreteHabitResult: ( HabitLean ) | ( HabitAlreadyExistsError ) | ( UserNotFoundError );
  DeleteHabitResult: ( HabitLean ) | ( HabitNotFoundError ) | ( UserNotFoundError );
  HabitLogResult: ( HabitLogLean ) | ( HabitLogAlreadyExistsError ) | ( HabitNotFoundError );
  HabitResult: ( HabitLean ) | ( HabitNotFoundError ) | ( UserNotFoundError );
  LoginResult: ( Omit<AuthPayload, 'user'> & { user: _RefType['User'] } ) | ( InvalidInputError ) | ( UserNotFoundError );
  RefreshTokenResult: ( InvalidRefreshTokenError ) | ( RefreshPayload ) | ( RefreshTokenNotFoundError );
  RegisterResult: ( Omit<AuthPayload, 'user'> & { user: _RefType['User'] } ) | ( UserAlreadyExistsError );
  UserResult: ( UserLean ) | ( UserNotFoundError );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user: ResolversTypes['User'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateHabitInput: CreateHabitInput;
  CreteHabitResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreteHabitResult']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteHabitResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteHabitResult']>;
  Habit: ResolverTypeWrapper<HabitLean>;
  HabitAlreadyExistsError: ResolverTypeWrapper<HabitAlreadyExistsError>;
  HabitLog: ResolverTypeWrapper<HabitLogLean>;
  HabitLogAlreadyExistsError: ResolverTypeWrapper<HabitLogAlreadyExistsError>;
  HabitLogResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HabitLogResult']>;
  HabitNotFoundError: ResolverTypeWrapper<HabitNotFoundError>;
  HabitResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HabitResult']>;
  InvalidInputError: ResolverTypeWrapper<InvalidInputError>;
  InvalidRefreshTokenError: ResolverTypeWrapper<InvalidRefreshTokenError>;
  LoginResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LoginResult']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RefreshPayload: ResolverTypeWrapper<RefreshPayload>;
  RefreshTokenNotFoundError: ResolverTypeWrapper<RefreshTokenNotFoundError>;
  RefreshTokenResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RefreshTokenResult']>;
  RegisterInput: RegisterInput;
  RegisterResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['RegisterResult']>;
  Regularity: Regularity;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserLean>;
  UserAlreadyExistsError: ResolverTypeWrapper<UserAlreadyExistsError>;
  UserNotFoundError: ResolverTypeWrapper<UserNotFoundError>;
  UserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserResult']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, 'user'> & { user: ResolversParentTypes['User'] };
  Boolean: Scalars['Boolean']['output'];
  CreateHabitInput: CreateHabitInput;
  CreteHabitResult: ResolversUnionTypes<ResolversParentTypes>['CreteHabitResult'];
  Date: Scalars['Date']['output'];
  DeleteHabitResult: ResolversUnionTypes<ResolversParentTypes>['DeleteHabitResult'];
  Habit: HabitLean;
  HabitAlreadyExistsError: HabitAlreadyExistsError;
  HabitLog: HabitLogLean;
  HabitLogAlreadyExistsError: HabitLogAlreadyExistsError;
  HabitLogResult: ResolversUnionTypes<ResolversParentTypes>['HabitLogResult'];
  HabitNotFoundError: HabitNotFoundError;
  HabitResult: ResolversUnionTypes<ResolversParentTypes>['HabitResult'];
  InvalidInputError: InvalidInputError;
  InvalidRefreshTokenError: InvalidRefreshTokenError;
  LoginResult: ResolversUnionTypes<ResolversParentTypes>['LoginResult'];
  Mutation: {};
  ObjectId: Scalars['ObjectId']['output'];
  Query: {};
  RefreshPayload: RefreshPayload;
  RefreshTokenNotFoundError: RefreshTokenNotFoundError;
  RefreshTokenResult: ResolversUnionTypes<ResolversParentTypes>['RefreshTokenResult'];
  RegisterInput: RegisterInput;
  RegisterResult: ResolversUnionTypes<ResolversParentTypes>['RegisterResult'];
  String: Scalars['String']['output'];
  User: UserLean;
  UserAlreadyExistsError: UserAlreadyExistsError;
  UserNotFoundError: UserNotFoundError;
  UserResult: ResolversUnionTypes<ResolversParentTypes>['UserResult'];
};

export type AuthPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreteHabitResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CreteHabitResult'] = ResolversParentTypes['CreteHabitResult']> = {
  __resolveType: TypeResolveFn<'Habit' | 'HabitAlreadyExistsError' | 'UserNotFoundError', ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteHabitResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DeleteHabitResult'] = ResolversParentTypes['DeleteHabitResult']> = {
  __resolveType: TypeResolveFn<'Habit' | 'HabitNotFoundError' | 'UserNotFoundError', ParentType, ContextType>;
};

export type HabitResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Habit'] = ResolversParentTypes['Habit']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  habitLogs?: Resolver<Array<ResolversTypes['HabitLog']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  regularity?: Resolver<Maybe<ResolversTypes['Regularity']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitAlreadyExistsErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitAlreadyExistsError'] = ResolversParentTypes['HabitAlreadyExistsError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitLogResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitLog'] = ResolversParentTypes['HabitLog']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  habitId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitLogAlreadyExistsErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitLogAlreadyExistsError'] = ResolversParentTypes['HabitLogAlreadyExistsError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitLogResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitLogResult'] = ResolversParentTypes['HabitLogResult']> = {
  __resolveType: TypeResolveFn<'HabitLog' | 'HabitLogAlreadyExistsError' | 'HabitNotFoundError', ParentType, ContextType>;
};

export type HabitNotFoundErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitNotFoundError'] = ResolversParentTypes['HabitNotFoundError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitResult'] = ResolversParentTypes['HabitResult']> = {
  __resolveType: TypeResolveFn<'Habit' | 'HabitNotFoundError' | 'UserNotFoundError', ParentType, ContextType>;
};

export type InvalidInputErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InvalidInputError'] = ResolversParentTypes['InvalidInputError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvalidRefreshTokenErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InvalidRefreshTokenError'] = ResolversParentTypes['InvalidRefreshTokenError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = {
  __resolveType: TypeResolveFn<'AuthPayload' | 'InvalidInputError' | 'UserNotFoundError', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createHabit?: Resolver<ResolversTypes['CreteHabitResult'], ParentType, ContextType, RequireFields<MutationCreateHabitArgs, 'input'>>;
  createHabitLog?: Resolver<ResolversTypes['HabitLogResult'], ParentType, ContextType, RequireFields<MutationCreateHabitLogArgs, 'habitId'>>;
  deleteHabit?: Resolver<ResolversTypes['DeleteHabitResult'], ParentType, ContextType>;
  deleteUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['LoginResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLogoutArgs, 'token'>>;
  refresh?: Resolver<ResolversTypes['RefreshTokenResult'], ParentType, ContextType, RequireFields<MutationRefreshArgs, 'token'>>;
  register?: Resolver<ResolversTypes['RegisterResult'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  habit?: Resolver<ResolversTypes['HabitResult'], ParentType, ContextType, RequireFields<QueryHabitArgs, 'id'>>;
  habitLogs?: Resolver<Array<ResolversTypes['HabitLog']>, ParentType, ContextType, RequireFields<QueryHabitLogsArgs, 'habitId'>>;
  habits?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType, RequireFields<QueryHabitsArgs, 'userId'>>;
  user?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RefreshPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RefreshPayload'] = ResolversParentTypes['RefreshPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RefreshTokenNotFoundErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RefreshTokenNotFoundError'] = ResolversParentTypes['RefreshTokenNotFoundError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RefreshTokenResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RefreshTokenResult'] = ResolversParentTypes['RefreshTokenResult']> = {
  __resolveType: TypeResolveFn<'InvalidRefreshTokenError' | 'RefreshPayload' | 'RefreshTokenNotFoundError', ParentType, ContextType>;
};

export type RegisterResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RegisterResult'] = ResolversParentTypes['RegisterResult']> = {
  __resolveType: TypeResolveFn<'AuthPayload' | 'UserAlreadyExistsError', ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  habits?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAlreadyExistsErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserAlreadyExistsError'] = ResolversParentTypes['UserAlreadyExistsError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNotFoundErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserNotFoundError'] = ResolversParentTypes['UserNotFoundError']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  __resolveType: TypeResolveFn<'User' | 'UserNotFoundError', ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CreteHabitResult?: CreteHabitResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteHabitResult?: DeleteHabitResultResolvers<ContextType>;
  Habit?: HabitResolvers<ContextType>;
  HabitAlreadyExistsError?: HabitAlreadyExistsErrorResolvers<ContextType>;
  HabitLog?: HabitLogResolvers<ContextType>;
  HabitLogAlreadyExistsError?: HabitLogAlreadyExistsErrorResolvers<ContextType>;
  HabitLogResult?: HabitLogResultResolvers<ContextType>;
  HabitNotFoundError?: HabitNotFoundErrorResolvers<ContextType>;
  HabitResult?: HabitResultResolvers<ContextType>;
  InvalidInputError?: InvalidInputErrorResolvers<ContextType>;
  InvalidRefreshTokenError?: InvalidRefreshTokenErrorResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RefreshPayload?: RefreshPayloadResolvers<ContextType>;
  RefreshTokenNotFoundError?: RefreshTokenNotFoundErrorResolvers<ContextType>;
  RefreshTokenResult?: RefreshTokenResultResolvers<ContextType>;
  RegisterResult?: RegisterResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAlreadyExistsError?: UserAlreadyExistsErrorResolvers<ContextType>;
  UserNotFoundError?: UserNotFoundErrorResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
};

