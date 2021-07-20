const SUPPORTED_LANGUAGE = ['ko', 'en'];
const selectedLanguage = process.argv[2];

if (!SUPPORTED_LANGUAGE.includes(selectedLanguage)) {
    console.error('The specific language is not supported');
    process.exit(1);
}

const translationModule = `./strings-${selectedLanguage}.mjs`;
import(translationModule)
    .then((res) => {
        console.log(res.HELLO);
    });
