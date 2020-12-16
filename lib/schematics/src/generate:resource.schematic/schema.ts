export interface Schema {
  name: string;
}

export class GranulatedElementsSelection {
  controller: boolean = false;
  model: boolean = false;
  repository: boolean = false;
  restValidators: boolean = false;
  routes: boolean = false;
  transform: boolean = false;
  testingSpecs: boolean = false;

  constructor(rawSelection: string[]) {
    let selectionMap = this.selectionMap();
    rawSelection.forEach((selection: string) => {
      let mappedPropertyName = selectionMap[selection];
      if (mappedPropertyName) (this as any)[mappedPropertyName] = true;
    });
  }

  private selectionMap(): any {
    return {
      Controller: 'controller',
      Model: 'model',
      Repository: 'repository',
      'REST Validators': 'restValidators',
      Routes: 'routes',
      Transformer: 'transform',
      'Testing specs': 'testingSpecs'
    };
  }
}
