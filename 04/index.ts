const fs4 = require("fs");

const lerArquivo4 = (): unknown => {
  return JSON.parse(fs4.readFileSync("./bd.json"));
};

const escreverArquivo4 = (dados: any): void => {
  fs4.writeFileSync("./bd.json", JSON.stringify(dados));
};

type Usuario4 = {
  nome: string;
  email: string;
  cpf: number;
  profissao?: string;
  endereco: Endereco4 | null;
};
type Endereco4 = { 
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

const cadastrarUsuario4 = (dados: Usuario4): Usuario4 => {
  const usuarios = lerArquivo4() as Usuario4[];

  usuarios.push(dados);

  escreverArquivo4(usuarios);

  return dados;
};

const listarUsuarios4 = (): Usuario4[] => {
  const usuarios = lerArquivo4() as Usuario4[];

  return usuarios;
};

const atualizarUsuario4 = (cpf: number, dados: Usuario4): Usuario4 => {
  const usuarios = lerArquivo4() as Usuario4[];

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

  escreverArquivo4(listaAtualizada);

  return usuarioAtualizado;
};

const detalharUsuario4 = (cpf: number): Usuario4 => {
  const usuarios = lerArquivo4() as Usuario4[];

  const usuarioEncontrado = usuarios.find((usuario) => usuario.cpf === cpf);

  if (!usuarioEncontrado) {
    throw new Error("Usuário não encontrado");
  }

  return usuarioEncontrado;
};

const excluirUsuario4 = (cpf: number): void => {
    const usuarios = lerArquivo4() as Usuario4[];
    
    const listaAtualizada = usuarios.filter((usuario) => usuario.cpf !== cpf);
    
    escreverArquivo4(listaAtualizada);
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

excluirUsuario4(12345678900);

console.log(listarUsuarios4());
