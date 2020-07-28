export interface RootState {
    // доп свойства
  }

export interface ActionMutationType<T=void>{
    (payload?: T): Promise<void>;
  }