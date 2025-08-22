import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { HabitLean } from '../models/habit';
import type { HabitLogLean } from '../models/habit-log';
import type { UserLean } from '../models/user';
import type { GraphQLContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type CreateHabit = {
  description?: InputMaybe<Scalars['String']['input']>;
  regularity?: InputMaybe<Regularity>;
  title: Scalars['String']['input'];
  userId: Scalars['ObjectId']['input'];
};

export type CreateUser = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CreateUserResult = User | UserAlreadyExistsError;

export type CreteHabitResult = Habit | HabitAlreadyExistsError | UserNotFoundError;

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

export type Mutation = {
  __typename?: 'Mutation';
  createHabit: CreteHabitResult;
  createHabitLog: HabitLogResult;
  createUser: CreateUserResult;
  deleteHabit: HabitResult;
  deleteUser: UserResult;
  updateUser: UserResult;
};


export type MutationCreateHabitArgs = {
  input: CreateHabit;
};


export type MutationCreateHabitLogArgs = {
  habitId: Scalars['ObjectId']['input'];
  status?: InputMaybe<Status>;
};


export type MutationCreateUserArgs = {
  input: CreateUser;
};


export type MutationDeleteHabitArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationUpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
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


export type QueryUserArgs = {
  id: Scalars['ObjectId']['input'];
};

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
  username: Scalars['String']['output'];
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
  CreateUserResult: ( UserLean ) | ( UserAlreadyExistsError );
  CreteHabitResult: ( HabitLean ) | ( HabitAlreadyExistsError ) | ( UserNotFoundError );
  HabitLogResult: ( HabitLogLean ) | ( HabitLogAlreadyExistsError ) | ( HabitNotFoundError );
  HabitResult: ( HabitLean ) | ( HabitNotFoundError ) | ( UserNotFoundError );
  UserResult: ( UserLean ) | ( UserNotFoundError );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateHabit: CreateHabit;
  CreateUser: CreateUser;
  CreateUserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateUserResult']>;
  CreteHabitResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreteHabitResult']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Habit: ResolverTypeWrapper<HabitLean>;
  HabitAlreadyExistsError: ResolverTypeWrapper<HabitAlreadyExistsError>;
  HabitLog: ResolverTypeWrapper<HabitLogLean>;
  HabitLogAlreadyExistsError: ResolverTypeWrapper<HabitLogAlreadyExistsError>;
  HabitLogResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HabitLogResult']>;
  HabitNotFoundError: ResolverTypeWrapper<HabitNotFoundError>;
  HabitResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['HabitResult']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  Query: ResolverTypeWrapper<{}>;
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
  Boolean: Scalars['Boolean']['output'];
  CreateHabit: CreateHabit;
  CreateUser: CreateUser;
  CreateUserResult: ResolversUnionTypes<ResolversParentTypes>['CreateUserResult'];
  CreteHabitResult: ResolversUnionTypes<ResolversParentTypes>['CreteHabitResult'];
  Date: Scalars['Date']['output'];
  Habit: HabitLean;
  HabitAlreadyExistsError: HabitAlreadyExistsError;
  HabitLog: HabitLogLean;
  HabitLogAlreadyExistsError: HabitLogAlreadyExistsError;
  HabitLogResult: ResolversUnionTypes<ResolversParentTypes>['HabitLogResult'];
  HabitNotFoundError: HabitNotFoundError;
  HabitResult: ResolversUnionTypes<ResolversParentTypes>['HabitResult'];
  Mutation: {};
  ObjectId: Scalars['ObjectId']['output'];
  Query: {};
  String: Scalars['String']['output'];
  User: UserLean;
  UserAlreadyExistsError: UserAlreadyExistsError;
  UserNotFoundError: UserNotFoundError;
  UserResult: ResolversUnionTypes<ResolversParentTypes>['UserResult'];
};

export type CreateUserResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CreateUserResult'] = ResolversParentTypes['CreateUserResult']> = {
  __resolveType: TypeResolveFn<'User' | 'UserAlreadyExistsError', ParentType, ContextType>;
};

export type CreteHabitResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CreteHabitResult'] = ResolversParentTypes['CreteHabitResult']> = {
  __resolveType: TypeResolveFn<'Habit' | 'HabitAlreadyExistsError' | 'UserNotFoundError', ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

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

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createHabit?: Resolver<ResolversTypes['CreteHabitResult'], ParentType, ContextType, RequireFields<MutationCreateHabitArgs, 'input'>>;
  createHabitLog?: Resolver<ResolversTypes['HabitLogResult'], ParentType, ContextType, RequireFields<MutationCreateHabitLogArgs, 'habitId'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResult'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteHabit?: Resolver<ResolversTypes['HabitResult'], ParentType, ContextType, RequireFields<MutationDeleteHabitArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  habit?: Resolver<ResolversTypes['HabitResult'], ParentType, ContextType, RequireFields<QueryHabitArgs, 'id'>>;
  habitLogs?: Resolver<Array<ResolversTypes['HabitLog']>, ParentType, ContextType, RequireFields<QueryHabitLogsArgs, 'habitId'>>;
  habits?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType, RequireFields<QueryHabitsArgs, 'userId'>>;
  user?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  habits?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  CreateUserResult?: CreateUserResultResolvers<ContextType>;
  CreteHabitResult?: CreteHabitResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Habit?: HabitResolvers<ContextType>;
  HabitAlreadyExistsError?: HabitAlreadyExistsErrorResolvers<ContextType>;
  HabitLog?: HabitLogResolvers<ContextType>;
  HabitLogAlreadyExistsError?: HabitLogAlreadyExistsErrorResolvers<ContextType>;
  HabitLogResult?: HabitLogResultResolvers<ContextType>;
  HabitNotFoundError?: HabitNotFoundErrorResolvers<ContextType>;
  HabitResult?: HabitResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAlreadyExistsError?: UserAlreadyExistsErrorResolvers<ContextType>;
  UserNotFoundError?: UserNotFoundErrorResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
};

