const fs3 = require("fs");

const lerArquivo3 = (): unknown => {
  return JSON.parse(fs3.readFileSync("./bd.json"));
};

const escreverArquivo3 = (dados: any): void => {
  fs3.writeFileSync("./bd.json", JSON.stringify(dados));
};

type Usuario3 = {
  nome: string;
  email: string;
  cpf: number;
  profissao?: string;
  endereco: Endereco3 | null;
};
type Endereco3 = { 
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

const cadastrarUsuario3 = (dados: Usuario3): Usuario3 => {
  const usuarios = lerArquivo3() as Usuario3[];

  usuarios.push(dados);

  escreverArquivo3(usuarios);

  return dados;
};

const listarUsuarios3 = (): Usuario3[] => {
  const usuarios = lerArquivo3() as Usuario3[];

  return usuarios;
};

const atualizarUsuario3 = (cpf: number, dados: Usuario3): Usuario3 => {
  const usuarios = lerArquivo3() as Usuario3[];

  const usuarioEncontrado = usuarios.find((usuario) => usuario.cpf === cpf);

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado");
  }

//   Object.assign(usuarioEncontrado, dados);

  const usuarioAtualizado = {
    ...usuarioEncontrado,
    ...dados,
  };

  const listaAtualizada = usuarios.map((usuario) => {
    if (usuario.cpf === cpf) {
      return usuarioAtualizado;
    }

    return usuario;
  });

  escreverArquivo3(listaAtualizada);

  return usuarioAtualizado;
};

const detalharUsuario3 = (cpf: number): Usuario3 => {
  const usuarios = lerArquivo3() as Usuario3[];

  const usuarioEncontrado = usuarios.find((usuario) => usuario.cpf === cpf);

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado");
  }

  return usuarioEncontrado;
};

// cadastrarUsuario3({
//   nome: "Jeferson Vieira",
//   email: "jefersonvieira@gmail.com",
//   cpf: 12345678900,
//   profissao: "Dev",
//   endereco: {
//     cep: "012345-678",
//     rua: "Rua do Astrodev",
//     complemento: "apt 123",
//     bairro: "Brooklin",
//     cidade: "São Paulo",
//   },
// });

// atualizarUsuario3(12345678900, {
//   nome: "Jeferson Vieira Moreira",
//   email: "jeferson@gmail.com",
//   cpf: 12345678900,
//   profissao: "Dev",
//   endereco: {
//     cep: "012345-678",
//     rua: "Rua do Astrodev",
//     complemento: "apt 123",
//     bairro: "Brooklin",
//     cidade: "São Paulo",
//   },
// });

console.log(detalharUsuario3(12345678910));

console.log(listarUsuarios3());
