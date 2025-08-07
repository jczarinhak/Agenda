export class Contato {
  private _nome: string;
  private _telefone: string;
  _dataNascimento: string;
  _genero: string;

  constructor(nome: string, telefone: string, dataNascimento: string, genero: string) {
    this._nome = nome;
    this._telefone = telefone;
    this._dataNascimento = dataNascimento;
    this._genero = genero;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get telefone(): string {
    return this._telefone;
  }

  public set telefone(value: string) {
    this._telefone = value;
  }

  public get dataNascimento(): string {
    return this._dataNascimento;
  }

  public set dataNascimento(value: string) {
    this._dataNascimento = value;
  }

  public get genero(): string {
    return this._genero;
  }

  public set genero(value: string) {
    this._genero = value;
  }
}
