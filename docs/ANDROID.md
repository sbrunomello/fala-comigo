# Android / APK

O Fala Comigo continua sendo uma PWA e também pode ser empacotado como aplicativo Android com Capacitor.

## Requisitos locais

- Node.js 22+
- Java/JDK 21
- Android SDK 36
- `npm install`

## Gerar APK pelo computador

Na raiz do projeto:

```bash
npm install
npm run android:apk
```

Na primeira execução o script cria o projeto Android com Capacitor. Nas próximas execuções ele sincroniza o conteúdo web antes de compilar.

O APK debug é criado em:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

O script funciona em Windows, macOS e Linux e escolhe automaticamente `gradlew.bat` ou `./gradlew`.

## Gerar pelo GitHub Actions

O workflow **Android APK** é executado quando arquivos relevantes mudam em um pull request e também aceita execução manual por `workflow_dispatch`.

No GitHub:

1. Abra **Actions**.
2. Selecione **Android APK**.
3. Execute o workflow na branch desejada, quando usar execução manual.
4. Quando o job terminar, abra a execução.
5. Em **Artifacts**, baixe `fala-comigo-debug-apk`.
6. Dentro do ZIP estará `app-debug.apk`.

O artifact de CI é um APK **debug**, adequado para instalação e testes internos. Para publicar em loja é necessário configurar versão, assinatura de release/keystore e processo de distribuição separado.

## Estrutura

- `capacitor.config.json`: identidade e diretório web do app nativo.
- `scripts/build.mjs`: prepara `dist/` com a PWA.
- `scripts/android-apk.mjs`: cria/sincroniza o projeto Android e compila o APK.
- `.github/workflows/android-apk.yml`: gera o APK no GitHub Actions.

O diretório `android/` é gerado e fica fora do Git neste estágio para evitar manter código nativo derivado sem necessidade. Quando houver customizações Android específicas, ele pode passar a ser versionado deliberadamente.
