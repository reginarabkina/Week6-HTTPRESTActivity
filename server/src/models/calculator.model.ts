
import { NumericKeys, OperatorKeys, ActionKeys } from '../enums';
import { ICalculatorModel, IContext, ICalculatorState } from '../interfaces';
import { EnteringFirstNumberState } from '../states/entering-first-number.state';
import { StateData } from './state-data.model';

export class CalculatorModel implements ICalculatorModel, IContext {

  private _state: ICalculatorState;

  public constructor() {
    this._state = new EnteringFirstNumberState(this, new StateData.Builder().build());
  }

  public changeState(newState: ICalculatorState): void {
    this._state = newState;
  }

  public pressNumericKey(key: NumericKeys): void {
    this._state.digit(key);
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this._state.binaryOperator(key);
  }

  public pressActionKey(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this._state.clear();
        break;
      case ActionKeys.DOT:
        this._state.decimalSeparator();
        break;
      case ActionKeys.EQUALS:
        this._state.equals();
        break;
      default:
        throw new Error('Invalid Action');
    }
  }

  public display(): string {
    return this._state.display();
  }

}
