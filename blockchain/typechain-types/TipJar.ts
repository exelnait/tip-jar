/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace TipJar {
  export type TipStruct = {
    sender: PromiseOrValue<string>;
    message: PromiseOrValue<string>;
    name: PromiseOrValue<string>;
    timestamp: PromiseOrValue<BigNumberish>;
    amount: PromiseOrValue<BigNumberish>;
  };

  export type TipStructOutput = [
    string,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    sender: string;
    message: string;
    name: string;
    timestamp: BigNumber;
    amount: BigNumber;
  };
}

export interface TipJarInterface extends utils.Interface {
  functions: {
    "getAllTips()": FunctionFragment;
    "owner()": FunctionFragment;
    "sendTip(string,string)": FunctionFragment;
    "totalTips()": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getAllTips"
      | "owner"
      | "sendTip"
      | "totalTips"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getAllTips",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sendTip",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "totalTips", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "getAllTips", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sendTip", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalTips", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "NewTip(address,string,string,uint256)": EventFragment;
    "NewWithdraw(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewTip"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewWithdraw"): EventFragment;
}

export interface NewTipEventObject {
  from: string;
  message: string;
  name: string;
  amount: BigNumber;
}
export type NewTipEvent = TypedEvent<
  [string, string, string, BigNumber],
  NewTipEventObject
>;

export type NewTipEventFilter = TypedEventFilter<NewTipEvent>;

export interface NewWithdrawEventObject {
  amount: BigNumber;
}
export type NewWithdrawEvent = TypedEvent<[BigNumber], NewWithdrawEventObject>;

export type NewWithdrawEventFilter = TypedEventFilter<NewWithdrawEvent>;

export interface TipJar extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TipJarInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getAllTips(overrides?: CallOverrides): Promise<[TipJar.TipStructOutput[]]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    sendTip(
      _message: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalTips(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getAllTips(overrides?: CallOverrides): Promise<TipJar.TipStructOutput[]>;

  owner(overrides?: CallOverrides): Promise<string>;

  sendTip(
    _message: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalTips(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAllTips(overrides?: CallOverrides): Promise<TipJar.TipStructOutput[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    sendTip(
      _message: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalTips(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "NewTip(address,string,string,uint256)"(
      from?: PromiseOrValue<string> | null,
      message?: null,
      name?: null,
      amount?: null
    ): NewTipEventFilter;
    NewTip(
      from?: PromiseOrValue<string> | null,
      message?: null,
      name?: null,
      amount?: null
    ): NewTipEventFilter;

    "NewWithdraw(uint256)"(amount?: null): NewWithdrawEventFilter;
    NewWithdraw(amount?: null): NewWithdrawEventFilter;
  };

  estimateGas: {
    getAllTips(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    sendTip(
      _message: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalTips(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAllTips(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sendTip(
      _message: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalTips(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
