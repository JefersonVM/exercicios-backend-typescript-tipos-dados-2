const fs2 = require("fs");

const lerArquivo2 = (): unknown => {
  return JSON.parse(fs2.readFileSync("./bd.json"));
};

const escreverArquivo2 = (dados: any): void => {
  fs2.writeFileSync("./bd.json", JSON.stringify(dados));
};

type Usuario = {
  nome: string;
  email: string;
  cpf: number;
  profissao?: string;
  endereco: Endereco | null;
};
type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

const cadastrarUsuario = (dados: Usuario): Usuario => {
  const usuarios = lerArquivo2() as Usuario[];

  usuarios.push(dados);

  escreverArquivo2(usuarios);

  return dados;
};

const listarUsuarios = (): Usuario[] => {
  const usuarios = lerArquivo2() as Usuario[];

  return usuarios;
};

cadastrarUsuario({
  nome: "Jeferson Vieira",
  email: "jefersonvieira@gmail.com",
  cpf: 12345678900,
  profissao: "Dev",
  endereco: {
    cep: "012345-678",
    rua: "Rua do Astrodev",
    complemento: "apt 123",
    bairro: "Brooklin",
    cidade: "São Paulo",
  },
});

console.log(listarUsuarios());
