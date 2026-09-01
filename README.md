# MVP DESENVOLVIMENTO BACKEND

## Índice
- [Aluno](#aluno)
- [Situação Escolhida](#situação-escolhida)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Objetivos](#objetivos)
- [Público-alvo](#público-alvo)
- [Os possíveis atores envolvidos](#os-possíveis-atores-envolvidos)
- [Protótipos](#protótipos)
- [Execução do projeto](#Execução-do-Projeto)
- [REQUISITOS FUNCIONAIS](#requisitos-funcionais)
- [REQUISITOS NÃO FUNCIONAIS](#requisitos-não-funcionais)

## Aluno
- TIAGO EVARISTO CONDACK	

## Situação Escolhida 
Circuito Terê Verde

A geografia do território municipal de Teresópolis é caracterizada por terrenos montanhosos entremeados por vales. A área urbana encontra-se em um planalto a 869 metros acima do nível do mar e é delimitada por três unidades de conservação: o Parque Nacional da Serra dos Órgãos, o Parque Estadual dos Três Picos e o Parque Natural Municipal Montanhas de Teresópolis. A existência das unidades de conservação proporciona ao município o turismo ambiental, em especial de montanhismo, e também limitam o crescimento urbano.

Teresópolis é um destino turístico popular, atraindo visitantes em busca de belezas naturais e atividades ao ar livre, como trilhas e escaladas. A proposta do Circuito Terê Verde busca promover essas atrações, destacando a rica biodiversidade e as opções de ecoturismo disponíveis na região. A plataforma “Terê Verde Online” permitirá que os visitantes tenham acesso a informações atualizadas sobre a biodiversidade, trilhas, cachoeiras e eventos que ocorrem nesses espaços protegidos.

 	

Possíveis Atores Envolvidos

●   Visitantes: Usuários que buscam informações sobre a biodiversidade, trilhas e eventos.

●   Administradores: Responsáveis por manter o site atualizado com informações relevantes.

Exigências

● Gestão de Disponibilidade: Os administradores devem ter uma área para configurar a disponibilidade e horários de funcionamento de eventos e temporadas, além de atualizações de novidades.

● Desempenho Rápido: O sistema deve responder rapidamente para acomodar um grande número de usuários simultaneamente.

● Interface Intuitiva: A interface do usuário deve ser amigável e de fácil utilização, permitindo navegação fluida.

● Segurança de Dados: Garantir a segurança e privacidade dos dados pessoais dos administradores.

● Login para Administradores: Um botão de login deve ser disponibilizado para que os administradores acessem áreas restritas do site.


## Tecnologias Utilizadas
- **Django**
- **PostgreSQL**
- **React + Vite**


## Objetivos
Website que  melhore a relação do turista com o turismo ecológico na cidade de Teresópolis, unindo em uma plataforma simples e rápida informações importantes a respeito dos parques existentes, suas programações, atrações e eventos.

## Público-alvo
Todos que possuem interesse no ecoturismo, desde moradores da cidade a turistas de outros estados brasileiros.

## Dores do público-alvo
- Necessidade de um local centralizado de informações sobre os parques da cidade.
- Necessidade de gerenciamento unificado dos atrativos dos parques.
- A falta de informações precisas sobre os eventos de ecoturismo.
- A falta de informações sobre as dificuldades das trilhas, fazendo com que as pessoas pegassem trilhas inadequadas para os seus perfis.

## Os possíveis atores envolvidos
- Administrador(a) do site, responsável pela inserção e exclusão de agendas, pela gestão de disponibilidade de parques e trilhas.
- Usuários que terão acesso aos dados disponibilizados pela plataforma.

## Protótipos

Esboço inicial da interface, elaborado na fase de planejamento do MVP:

![Esboço inicial](prototipos/tereverde.png)

## Execução do Projeto

instalação do python

Clonar github

https://github.com/tcondack/MVPMOBILEDEVELOPMENT

Instalar dependencias 

pip install -r requirements.txt

na pasta backend rodar o servidor

python manage.py runserver

Na pasta frontend rodar o servidor

npm run dev

## Requisitos Funcionais

* **RF1.** Login Administradores
* **RF2.** Página dos Parques (Unidades de Conservação)
* **RF3.** Página de Trilhas e Eventos
* **RF4.** Gestão de disponibilidade de Eventos, Trilhas e Temporadas
* **RF5.** Gestão de Conteúdo e Novidades

## Requisitos Não Funcionais

* **RNF1.** Desempenho rápido (suporte a múltiplos acessos simultâneos)
* **RNF2.** Privacidade e Segurança de Dados Pessoais dos Administradores
* **RNF3.** Interface Intuitiva e Amigável
* **RNF4.** Segurança do Site e Áreas Restritas
* **RNF5.** Alta Disponibilidade do Sistema
* **RNF6.** Fluidez de Navegação
