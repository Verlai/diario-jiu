# Diário de Jiu-Jítsu — publicar e instalar

## O que este pacote contém
- index.html: formulário mais recente disponível nesta conversa, sem competição, versão de dados 2.
- manifest.webmanifest: nome, ícones e configuração de instalação.
- sw.js: cache offline apenas da interface.
- pwa.js: registro do service worker, status e botão de instalação quando suportado.
- icons/: ícones PNG, incluindo Apple e maskable.
- .nojekyll: desativa o processamento Jekyll.

Os fluxos do n8n e a planilha NÃO estão incluídos. Continue usando os dois fluxos que já funcionam. O payload, tipos de registro e chaves locais do formulário foram mantidos. Acrescentamos reenvio ao abrir online e proteção contra reenvios concorrentes na mesma janela; não há bloqueio entre dispositivos ou abas.

## 1. Antes de mudar
1. No HTML antigo, envie as pendências; se não conseguir, use Pendentes → Exportar JSON e guarde a cópia em local privado. O pacote não inclui importador de pendências.
2. Copie os rascunhos importantes para um local seguro. Anote sua URL de produção do webhook e tenha o token à mão, sem publicá-lo.
3. Não apague o HTML antigo nem seus dados até confirmar que tudo foi enviado.
4. Ao mudar de endereço, o armazenamento muda. O app publicado não importa automaticamente os dados do HTML local. Navegador e app instalado também podem usar armazenamento separado, especialmente no iPhone.

## 2. Criar repositório no GitHub
1. Entre em https://github.com e use + → New repository.
2. Nome sugerido: diario-jiu.
3. Escolha Public para o caminho simples no plano gratuito; confirme que só vai enviar arquivos públicos da interface.
4. Marque Add a README file e clique Create repository.
5. Extraia o ZIP deste pacote no computador.
6. No repositório: Add file → Upload files.
7. Arraste TODO O CONTEÚDO extraído, incluindo a pasta icons (não o ZIP e não a pasta externa que contém tudo).
8. Confirme que index.html ficará na raiz, ao lado de sw.js e manifest.webmanifest. Preserve icons/ como pasta.
9. Clique Commit changes. Se o sistema esconder .nojekyll, crie-o pelo GitHub em Add file → Create new file, nome .nojekyll, conteúdo vazio ou uma linha em branco, e confirme.

Estrutura esperada:
index.html
manifest.webmanifest
sw.js
pwa.js
.nojekyll
README.md
icons/icon-192.png
icons/icon-512.png
icons/icon-maskable-512.png
icons/apple-touch-icon.png

NÃO envie JSON dos fluxos do n8n, backups do diário, planilha, exportações de pendentes, tokens, senhas, arquivos .env nem credenciais. GitHub Pages não executa n8n. Um repositório privado também não garante que o site Pages seja privado; consulte seu plano e configuração.

## 3. Ativar GitHub Pages
1. Abra Settings → Pages do REPOSITÓRIO (não as configurações da conta).
2. Em Build and deployment, Source: Deploy from a branch.
3. Branch: main. Pasta: / (root). Clique Save.
4. Aguarde a implantação. A área Actions mostra o andamento e possíveis erros.
5. Volte a Settings → Pages e use Visit site.
6. O endereço usual é https://SEU-USUARIO.github.io/diario-jiu/ . Use o endereço real mostrado pelo GitHub, em HTTPS, e com a barra final.
7. Se disponível, mantenha Enforce HTTPS habilitado.

Se aparecer 404, aguarde a implantação e confira branch, raiz, nome index.html em minúsculas e pasta correta. Não abra o link github.com/.../blob/.../index.html: ele mostra código e não o aplicativo.

## 4. Ajustar o n8n sem substituir os fluxos
1. Deixe os dois fluxos existentes ativos/publicados e mantenha o n8n hospedado e acessível. Se o n8n roda só no seu computador, pode não estar disponível fora de casa ou com o computador desligado.
2. No fluxo que recebe registros, copie a Production URL do webhook. Não use /webhook-test/ e não use o webhook de outro fluxo.
3. O endpoint precisa usar HTTPS com certificado válido.
4. Preserve a autenticação Header Auth, cabeçalho X-Api-Key, com o mesmo token configurado no navegador.
5. Na configuração de CORS/Allowed Origins do webhook, autorize a origem https://SEU-USUARIO.github.io (SEM /diario-jiu/ e sem barra final). Se houver domínio próprio, use a origem dele.
6. Salve e publique as mudanças se sua versão exigir. Se já funciona com * em Allowed Origins, restrinja quando validar o site. CORS não é autenticação.
7. Caso haja proxy na frente do n8n, o preflight OPTIONS precisa aceitar a origem e permitir POST e os cabeçalhos Content-Type e X-Api-Key. A configuração exata varia conforme sua versão/proxy; não desative a autenticação para contornar falhas.
8. Não há necessidade de alterar o fluxo de e-mails apenas para instalar o PWA. As revisões por e-mail continuam dependendo do n8n, de suas credenciais e agenda, não do app estar aberto.

## 5. Configurar e testar o site antes de instalar
1. Abra o endereço Pages online. Confira os tipos e campos esperados.
2. Toque na engrenagem. Informe a URL de produção, token e identificador. Salve.
3. Clique Testar conexão. Ele confirma resposta do endpoint/autenticação, NÃO a gravação na planilha nem envio de e-mails.
4. Envie um registro real de teste. Confira na aba correta do Google Sheets e na execução do n8n.
5. Confira também as revisões e o fluxo de e-mail conforme suas regras existentes. O recebimento de um registro não prova que um e-mail foi enviado.
6. Aguarde o aviso de interface pronta para uso offline.

Diagnóstico: HTTP 401/403 costuma indicar autenticação/permissão; 404 pode indicar caminho incorreto ou workflow não publicado; Failed to fetch pode ser CORS, rede, certificado ou endereço incorreto. Consulte a execução no n8n e a aba Network do navegador sem compartilhar o token. Não desative HTTPS ou autenticação.

## 6. Instalar
### Android / Chrome
Abra o site → menu ⋮ → Instalar aplicativo ou Adicionar à tela inicial. O botão do formulário aparece quando o navegador oferece a instalação.
### iPhone / Safari
Abra no Safari → Compartilhar → Adicionar à Tela de Início → Adicionar. Ative Abrir como App se essa opção aparecer. Não é necessário que o botão do formulário apareça.
### Windows ou Linux / Chrome ou Edge
Abra o site → ícone de instalação na barra de endereço ou menu → Instalar aplicativo. No Edge, a opção pode estar em Aplicativos. Confirme. Depois você pode fixar no menu Iniciar/barra de tarefas, conforme seu sistema.
### Mac
Chrome/Edge: instale pelo navegador. No Safari compatível: Arquivo → Adicionar ao Dock.

Os nomes variam por sistema e versão. É um PWA, não um APK nem um EXE, e não precisa de loja. Use navegador normal, não aba anônima nem navegador embutido no WhatsApp/Instagram.

## 7. Depois de instalar: teste final
1. Abra pelo ícone com internet; se necessário, configure novamente URL e token. Cada dispositivo precisa de configuração própria.
2. Aguarde o aviso de interface offline pronta DENTRO do app instalado.
3. Feche o app, ative modo avião e reabra pelo ícone.
4. Preencha um registro de teste claramente identificado e toque Enviar. Ele deve ficar em Pendentes; o envio pode aguardar até 20 segundos antes de falhar e guardar.
5. Reative a internet e abra o app. Se não reenviar automaticamente, use Pendentes → Reenviar todos.
6. Confirme a linha no Sheets e a redução da contagem de pendências.
7. Faça o teste em cada dispositivo. Não reenvie simultaneamente em várias abas; o servidor deve tratar o mesmo ID de modo idempotente. Não envie manualmente outra cópia do mesmo registro para contornar um timeout.

## 8. Atualizações futuras
1. Envie os arquivos modificados ao mesmo repositório, mantendo os nomes e caminhos.
2. SEMPRE altere o valor de VERSION no início de sw.js (ex.: de um identificador antigo para v2) quando alterar HTML, JS, manifest ou ícones. Não altere as chaves de armazenamento local sem planejar migração.
3. Aguarde a implantação no GitHub.
4. Abra o app online e espere baixar a atualização. Um aviso pode aparecer.
5. Aguarde o rascunho salvar, feche TODAS as abas/janelas desse site/app e reabra. Se acabou de implantar, pode ser necessário abrir online uma vez, aguardar, fechar e abrir de novo.
6. Não é necessário reinstalar em atualizações normais. Nome/ícone podem demorar a refletir a mudança conforme o sistema.
7. O service worker só remove seus próprios caches antigos; não apaga localStorage. Não use Limpar dados do site como procedimento normal de atualização.

## Privacidade e limites
- Interface e código publicados são públicos. O pacote não oferece login. A planilha e o n8n devem continuar protegidos.
- Token é salvo no localStorage do navegador: não é um cofre. Use dispositivo pessoal, evite outros projetos não confiáveis na mesma origem github.io e limite acesso ao repositório. Repositórios Pages da mesma conta compartilham origem/armazenamento; não instale várias cópias deste diário ali esperando isolamento.
- Cache offline contém somente interface/ícones. Não armazena respostas do webhook nem credenciais em cache.
- Rascunhos, configuração e pendentes ficam locais; não sincronizam entre celular e computador. Registros enviados vão para a mesma planilha. Não há tela de histórico adicionada.
- Sem envio garantido em segundo plano com o app fechado. As revisões por e-mail são responsabilidade do fluxo do n8n.
- Armazenamento do navegador pode ser removido por limpeza, desinstalação ou falta de espaço. Exporte pendentes importantes e não confie nisso como único backup.
- Não houve publicação nem teste na sua conta/n8n. As verificações locais do pacote não substituem os testes online, de instalação e offline acima.
