import LogoINSS from "../componentes/LogoINSS.jsx";
import Icone from "../componentes/Icone.jsx";
import Acordeao from "../componentes/Acordeao.jsx";
import Avisos from "../componentes/Avisos.jsx";
import ListaServicos from "../componentes/ListaServicos.jsx";

const AVISOS = [
  {
    etiqueta: "Prova de vida",
    titulo: "Votar vale como prova de vida no INSS",
    texto:
      "Se você votou na última eleição, o INSS já recebe essa informação. Não precisa ir a uma agência.",
    rotuloLink: "Saiba mais sobre a prova de vida",
    href: "#prova-de-vida",
  },
  {
    etiqueta: "Pagamento",
    titulo: "Veja o dia certo do seu pagamento",
    texto:
      "O dia depende do número final do seu benefício. Consulte o calendário do mês sem precisar de senha.",
    rotuloLink: "Ver calendário de pagamento",
    href: "#calendario",
  },
  {
    etiqueta: "Segurança",
    titulo: "O INSS não liga pedindo senha nem dinheiro",
    texto:
      "Se alguém ligar pedindo sua senha do gov.br ou um depósito, desligue. Confirme sempre pela Central 135.",
    rotuloLink: "Saiba como se proteger de golpes",
    href: "#golpes",
  },
  {
    etiqueta: "Empréstimo",
    titulo: "Bloqueie empréstimos no seu benefício",
    texto:
      "Você pode bloquear novos empréstimos consignados pelo aplicativo e evitar descontos que não autorizou.",
    rotuloLink: "Saiba como bloquear empréstimos",
    href: "#consignado",
  },
];

const SERVICOS = [
  {
    nome: "Novo Pedido",
    descricao: "Pedir aposentadoria, auxílio e outros benefícios",
    icone: "mais",
    href: "#novo-pedido",
  },
  {
    nome: "Calendário de Pagamento",
    descricao: "Ver o dia em que o benefício cai na conta",
    icone: "calendario",
    href: "#calendario",
  },
  {
    nome: "Taxas de Empréstimo Consignado",
    descricao: "Comparar os juros cobrados pelos bancos",
    icone: "porcentagem",
    href: "#taxas",
  },
  {
    nome: "Sala Multissensorial",
    descricao: "Atendimento preparado para pessoas com deficiência",
    icone: "pecas",
    href: "#sala-multissensorial",
  },
  {
    nome: "Consultar Pedido",
    descricao: "Acompanhar um pedido que você já fez",
    icone: "documento",
    href: "#consultar-pedido",
  },
];

export default function Inicio({ aoEntrar, referenciaTitulo }) {
  return (
    <>
      <header className="cabecalho">
        <LogoINSS />
        <h1 ref={referenciaTitulo} tabIndex={-1}>
          Meu INSS
        </h1>
        <p className="cabecalho__subtitulo">
          Consulte seu benefício, peça aposentadoria e use outros serviços do
          INSS pelo celular.
        </p>
      </header>

      <main className="conteudo" id="conteudo">
        <section className="secao">
          <p>
            Para ver seus dados, entre com a sua conta gov.br. É a mesma conta
            que você usa em outros serviços do governo.
          </p>

          <button
            type="button"
            className="botao botao--primario botao--bloco"
            onClick={aoEntrar}
          >
            <Icone nome="entrar" />
            <span>Entrar com gov.br</span>
          </button>

          <Acordeao titulo="O que é a conta gov.br?" abertoInicialmente>
            <p>
              É uma conta <strong>gratuita</strong> do Governo Federal. Com ela
              você acessa o Meu INSS e outros serviços públicos.
            </p>
            <h4>Como entrar, em 3 passos:</h4>
            <ol>
              <li>
                Toque no botão azul <strong>Entrar com gov.br</strong>.
              </li>
              <li>
                Digite o seu <strong>CPF</strong>.
              </li>
              <li>
                Digite a <strong>senha</strong> que você criou no gov.br.
              </li>
            </ol>
            <p>
              <a href="#criar-conta">Ainda não tenho conta: criar agora</a>
            </p>
          </Acordeao>

          <div className="caixa caixa--ajuda">
            <p className="caixa__titulo">
              <Icone nome="telefone" />
              <span>Precisa de ajuda para entrar?</span>
            </p>
            <p>
              Ligue grátis para a <strong>Central 135</strong>, de segunda a
              sábado, das 7h às 22h. O atendimento é feito por uma pessoa.
            </p>
          </div>
        </section>

        <Avisos avisos={AVISOS} />

        <ListaServicos
          titulo="Serviços que não precisam de senha"
          servicos={SERVICOS}
        />
      </main>
    </>
  );
}
