const fs5 = require("fs");

const lerArquivo5 = (): unknown => {
  return JSON.parse(fs5.readFileSync("./bd.json"));
};

const escreverArquivo5 = (dados: any): void => {
  fs5.writeFileSync("./bd.json", JSON.stringify(dados));
};

type Usuario5 = {
  nome: string;
  email: string;
  cpf: number;
  profissao?: string;
  endereco: Endereco5 | null;
};
type Endereco5 = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

const cadastrarUsuario5 = (dados: Usuario5): Usuario5 => {
  const usuarios = lerArquivo5() as Usuario5[];

  usuarios.push(dados);

  escreverArquivo5(usuarios);

  return dados;
};

const listarUsuarios5 = (): Usuario5[] => {
  const usuarios = lerArquivo5() as Usuario5[];

  return usuarios;
};

const atualizarUsuario5 = (cpf: number, dados: Usuario5): Usuario5 => {
  const usuarios = lerArquivo5() as Usuario5[];

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

  escreverArquivo5(listaAtualizada);

  return usuarioAtualizado;
};

const detalharUsuario5 = (cpf: number): Usuario5 => {
  const usuarios = lerArquivo5() as Usuario5[];

  const usuarioEncontrado = usuarios.find((usuario) => usuario.cpf === cpf);

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado");
  }

  return usuarioEncontrado;
};

const excluirUsuario5 = (cpf: number): void => {
  const usuarios = lerArquivo5() as Usuario5[];

  const listaAtualizada = usuarios.filter((usuario) => usuario.cpf !== cpf);

  escreverArquivo5(listaAtualizada);
};

const filtrarUsuarioPorProfissao5 = (profissao: string): Usuario5[] => {
    const usuarios = lerArquivo5() as Usuario5[];
    
    const listaFiltrada = usuarios.filter(
        (usuario) => usuario.profissao === profissao
    );
    
    return listaFiltrada;
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



console.log(filtrarUsuarioPorProfissao5("Dev"));
