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
}

export type CreateHabit = {
  description?: InputMaybe<Scalars['String']['input']>
  title: Scalars['String']['input']
}

export type Habit = {
  __typename?: 'Habit'
  createdAt: Scalars['Date']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  logs: Array<HabitLog>
  title: Scalars['String']['output']
}

export type HabitLog = {
  __typename?: 'HabitLog'
  completed: Scalars['Boolean']['output']
  createdAt: Scalars['Date']['output']
  data: Scalars['Date']['output']
  habitId: Scalars['ID']['output']
  id: Scalars['ID']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  createHabit: Habit
  logHabit: HabitLog
}

export type MutationCreateHabitArgs = {
  input?: InputMaybe<CreateHabit>
}

export type MutationLogHabitArgs = {
  date: Scalars['Date']['input']
  habitId: Scalars['ID']['input']
}

export type Query = {
  __typename?: 'Query'
  habit?: Maybe<Habit>
  habits: Array<Maybe<Habit>>
  health: Scalars['String']['output']
}

export type QueryHabitArgs = {
  id: Scalars['ID']['input']
}

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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  CreateHabit: CreateHabit
  Date: ResolverTypeWrapper<Scalars['Date']['output']>
  Habit: ResolverTypeWrapper<HabitLean>
  HabitLog: ResolverTypeWrapper<HabitLogLean>
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']['output']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output']
  CreateHabit: CreateHabit
  Date: Scalars['Date']['output']
  Habit: HabitLean
  HabitLog: HabitLogLean
  ID: Scalars['ID']['output']
  Mutation: {}
  Query: {}
  String: Scalars['String']['output']
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  logs?: Resolver<Array<ResolversTypes['HabitLog']>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HabitLogResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes['HabitLog'] = ResolversParentTypes['HabitLog'],
> = {
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  data?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  habitId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
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
    Partial<MutationCreateHabitArgs>
  >
  logHabit?: Resolver<
    ResolversTypes['HabitLog'],
    ParentType,
    ContextType,
    RequireFields<MutationLogHabitArgs, 'date' | 'habitId'>
  >
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

export type Resolvers<ContextType = GraphQLContext> = {
  Date?: GraphQLScalarType
  Habit?: HabitResolvers<ContextType>
  HabitLog?: HabitLogResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
}
