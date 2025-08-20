import {
  type GraphQLResolveInfo,
  GraphQLScalarType,
  type GraphQLScalarTypeConfig,
} from 'graphql'
import type { HabitLean } from '../models/habit'
import type { HabitLogLean } from '../models/habitLog'
import type { GraphQLContext } from '../types'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Date: { input: string; output: string }
  ObjectId: { input: any; output: any }
}

export type CreateHabit = {
  description?: InputMaybe<Scalars['String']['input']>
  regularity?: InputMaybe<Regularity>
  title: Scalars['String']['input']
}

export type Habit = {
  __typename?: 'Habit'
  createdAt: Scalars['Date']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ObjectId']['output']
  logs: Array<HabitLog>
  regularity?: Maybe<Regularity>
  title: Scalars['String']['output']
}

export type HabitLog = {
  __typename?: 'HabitLog'
  createdAt: Scalars['Date']['output']
  habitId: Scalars['ObjectId']['output']
  id: Scalars['ObjectId']['output']
  status?: Maybe<Status>
}

export type HabitLogAlreadyExists = {
  __typename?: 'HabitLogAlreadyExists'
  existingLogId?: Maybe<Scalars['ObjectId']['output']>
  message: Scalars['String']['output']
}

export type HabitLogNotFound = {
  __typename?: 'HabitLogNotFound'
  message: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  createHabit: Habit
  updateHabitStatus: UpdateHabitStatus
}

export type MutationCreateHabitArgs = {
  input: CreateHabit
}

export type MutationUpdateHabitStatusArgs = {
  habitId: Scalars['ObjectId']['input']
  status?: InputMaybe<Status>
}

export type Query = {
  __typename?: 'Query'
  habit?: Maybe<Habit>
  habits: Array<Maybe<Habit>>
  health: Scalars['String']['output']
}

export type QueryHabitArgs = {
  id: Scalars['ObjectId']['input']
}

export enum Regularity {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
}

export enum Status {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
}

export type UpdateHabitStatus = HabitLog | HabitLogAlreadyExists

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  UpdateHabitStatus: HabitLogLean | HabitLogAlreadyExists
}

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  CreateHabit: CreateHabit
  Date: ResolverTypeWrapper<Scalars['Date']['output']>
  Habit: ResolverTypeWrapper<HabitLean>
  HabitLog: ResolverTypeWrapper<HabitLogLean>
  HabitLogAlreadyExists: ResolverTypeWrapper<HabitLogAlreadyExists>
  HabitLogNotFound: ResolverTypeWrapper<HabitLogNotFound>
  Mutation: ResolverTypeWrapper<{}>
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>
  Query: ResolverTypeWrapper<{}>
  Regularity: Regularity
  Status: Status
  String: ResolverTypeWrapper<Scalars['String']['output']>
  UpdateHabitStatus: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['UpdateHabitStatus']
  >
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output']
  CreateHabit: CreateHabit
  Date: Scalars['Date']['output']
  Habit: HabitLean
  HabitLog: HabitLogLean
  HabitLogAlreadyExists: HabitLogAlreadyExists
  HabitLogNotFound: HabitLogNotFound
  Mutation: {}
  ObjectId: Scalars['ObjectId']['output']
  Query: {}
  String: Scalars['String']['output']
  UpdateHabitStatus: ResolversUnionTypes<ResolversParentTypes>['UpdateHabitStatus']
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type HabitResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Habit'] = ResolversParentTypes['Habit'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>
  logs?: Resolver<Array<ResolversTypes['HabitLog']>, ParentType, ContextType>
  regularity?: Resolver<
    Maybe<ResolversTypes['Regularity']>,
    ParentType,
    ContextType
  >
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HabitLogResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['HabitLog'] = ResolversParentTypes['HabitLog'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  habitId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HabitLogAlreadyExistsResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['HabitLogAlreadyExists'] = ResolversParentTypes['HabitLogAlreadyExists'],
> = {
  existingLogId?: Resolver<
    Maybe<ResolversTypes['ObjectId']>,
    ParentType,
    ContextType
  >
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HabitLogNotFoundResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['HabitLogNotFound'] = ResolversParentTypes['HabitLogNotFound'],
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createHabit?: Resolver<
    ResolversTypes['Habit'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateHabitArgs, 'input'>
  >
  updateHabitStatus?: Resolver<
    ResolversTypes['UpdateHabitStatus'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHabitStatusArgs, 'habitId'>
  >
}

export interface ObjectIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId'
}

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  habit?: Resolver<
    Maybe<ResolversTypes['Habit']>,
    ParentType,
    ContextType,
    RequireFields<QueryHabitArgs, 'id'>
  >
  habits?: Resolver<
    Array<Maybe<ResolversTypes['Habit']>>,
    ParentType,
    ContextType
  >
  health?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type UpdateHabitStatusResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['UpdateHabitStatus'] = ResolversParentTypes['UpdateHabitStatus'],
> = {
  __resolveType: TypeResolveFn<
    'HabitLog' | 'HabitLogAlreadyExists',
    ParentType,
    ContextType
  >
}

export type Resolvers<ContextType = GraphQLContext> = {
  Date?: GraphQLScalarType
  Habit?: HabitResolvers<ContextType>
  HabitLog?: HabitLogResolvers<ContextType>
  HabitLogAlreadyExists?: HabitLogAlreadyExistsResolvers<ContextType>
  HabitLogNotFound?: HabitLogNotFoundResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  ObjectId?: GraphQLScalarType
  Query?: QueryResolvers<ContextType>
  UpdateHabitStatus?: UpdateHabitStatusResolvers<ContextType>
}
