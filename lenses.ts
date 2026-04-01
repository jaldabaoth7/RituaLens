// --- DATA STRUCTURES --- //

export interface LensCategory {
    code: 'analyseren' | 'interpreteren' | 'toepassen';
    name: string;
    description: string;
    icon: string; // SVG string
}

export interface LensPrompt {
    question: string;
}

export interface LensSubCode {
    code: string;
    name: string;
    type: string;
    prompts: LensPrompt[];
}

export interface ConceptualLens {
    code: string;
    name: string;
    description: string;
    subCodes: LensSubCode[];
    categories: LensCategory['code'][];
}

export type SynthesisSlot = (LensSubCode & { lensCode: string }) | null;

export interface SynthesisExample {
  title: string;
  description: string;
  ritualText: string;
  lenses: [SynthesisSlot, SynthesisSlot, SynthesisSlot, SynthesisSlot];
  synthesisText: string;
}


// --- CATEGORY DEFINITIONS --- //
export const LENS_CATEGORIES: LensCategory[] = [
    {
        code: 'analyseren',
        name: 'Analyseren',
        description: 'Lenses focused on dissecting the structure, components, and context of the ritual.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.49 11.16a1 1 0 0 0-1-1.16H18.4a8 8 0 0 0-1.42-2.9L18.4 5.68a1 1 0 0 0 0-1.37 1 1 0 0 0-1.37 0l-1.5 1.5A8 8 0 0 0 12.6 4.6a1 1 0 0 0-1.2 0 1 1 0 0 0 0 1.2l.8 2.4a8 8 0 0 0-3.6 2.4l-1.5-1.5a1 1 0 0 0-1.37 0 1 1 0 0 0 0 1.37l1.42 1.42A8 8 0 0 0 5.6 10H3.51a1 1 0 0 0-1 1.16l.5 2.5a1 1 0 0 0 1 .84h2.1a8 8 0 0 0 1.42 2.9l-1.42 1.42a1 1 0 0 0 0 1.37 1 1 0 0 0 1.37 0l1.5-1.5A8 8 0 0 0 11.4 20.4a1 1 0 0 0 1.2 0 1 1 0 0 0 0-1.2l-.8-2.4a8 8 0 0 0 3.6-2.4l1.5 1.5a1 1 0 0 0 1.37 0 1 1 0 0 0 0-1.37l-1.42-1.42a8 8 0 0 0 1.42-2.9h2.1a1 1 0 0 0 1-.84l.5-2.5Z"></path></svg>`
    },
    {
        code: 'interpreteren',
        name: 'Interpreteren',
        description: 'Lenses for uncovering meaning, symbolism, and philosophical or psychological layers.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.5A4.5 4.5 0 0 0 17.5 5c-.58 0-1.13.12-1.64.34-.41-.92-1-1.64-1.7-2.12a2 2 0 0 0-2.32 0l-3.38 2.44-3.4 2.44a2 2 0 0 0-2.32 0c-.7.48-1.3 1.2-1.7 2.12-.51-.22-1.06-.34-1.64-.34A4.5 4.5 0 0 0 2 9.5c0 4.5 3 12.5 6 12.5 1.25 0 2.5-1.06 4-1.06Z"></path><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06.4 0 .78-.05 1.14-.13-.44-.54-.8-1.16-1.08-1.87a4.5 4.5 0 0 1-1.02-3.34c.26-1.42 1.1-2.6 2.32-3.14a4.5 4.5 0 0 0-2.32-8.14c-.58 0-1.13.12-1.64.34-.41-.92-1-1.64-1.7-2.12a2 2 0 0 0-2.32 0l-3.38 2.44-3.4 2.44a2 2 0 0 0-2.32 0c-.7.48-1.3 1.2-1.7 2.12-.51-.22-1.06-.34-1.64-.34a4.5 4.5 0 0 0-2.32 8.14c1.22.54 2.06 1.72 2.32 3.14.04.22.06.44.06.66 0 1.28-.32 2.5-1.04 3.5-.1.14-.18.27-.26.4-.3.44-.5.9-.62 1.36.22-1.12 1.3-2 2.76-2 .4 0 .78.05 1.14.13.44.54.8 1.16 1.08 1.87a4.5 4.5 0 0 1 1.02 3.34Z"></path></svg>`
    },
    {
        code: 'toepassen',
        name: 'Toepassen',
        description: 'Lenses that examine the ritual\'s effect on the participant, its transformative process, and its practical application.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12-2 2 2 2"></path><path d="m15 12 2 2-2 2"></path><path d="M20 12h-2"></path><path d="M4 12h2"></path><path d="m12 20-2-2 2-2"></path><path d="m12 4 2 2-2 2"></path></svg>`
    }
];

// --- DATA FROM PDF --- //
export const LENSES_DATA: ConceptualLens[] = [
    {
        code: 'CON_TA',
        name: 'Talige Conceptie',
        description: 'Deze lens onderzoekt hoe taal, woordgebruik en structuur betekenis geven aan het ritueel. Het richt zich op semantiek, retoriek, narratief en symbolisch taalgebruik.',
        categories: ['analyseren'],
        subCodes: [
            { code: 'SE', name: 'Semantische Lading', type: 'Analyse van betekenisvelden.', prompts: [{ question: 'Wat zijn de sleutelwoorden in het ritueel (bv. Licht, Waarheid)?' }, { question: 'Welke betekenislagen hebben deze woorden in de maçonnieke context?' }] },
            { code: 'SY', name: 'Syntaxis en Structuur', type: 'Onderzoek naar taalstructuur.', prompts: [{ question: 'Hoe is de rituele taal opgebouwd (herhaling, ritmiek)?' }, { question: 'Wat is het effect van deze structuur op de beleving?' }] },
            { code: 'RE', name: 'Retorische Strategieën', type: 'Analyse van overtuigingskracht.', prompts: [{ question: 'Welke stijlfiguren worden gebruikt om de kandidaat te betrekken?' }, { question: 'Hoe creëert taal een gevoel van plechtigheid?' }] },
            { code: 'ET', name: 'Etymologie', type: 'Analyse van woordherkomst.', prompts: [{ question: 'Wat is de historische oorsprong van centrale termen?' }, { question: 'Onthult de etymologie een diepere, vergeten betekenis?' }] },
            { code: 'GL', name: 'Glossa & Vertaalspanning', type: 'Analyse van (ver)taalspanning.', prompts: [{ question: 'Zijn er termen afkomstig uit een andere taal?' }, { question: 'Wat is de spanning tussen de letterlijke en de symbolische betekenis?' }] },
            { code: 'NA', name: 'Narratieve Kaders', type: 'Analyse van het ritueel als verhaal.', prompts: [{ question: 'Kan het ritueel als een verhaal gelezen worden? Wat is de plot?' }, { question: 'Hoe wordt de kandidaat de protagonist in dit verhaal?' }] },
            { code: 'SYM', name: 'Talige Symbolisatie', type: 'Analyse van taal als symbool.', prompts: [{ question: 'Op welke momenten wordt taal zelf een symbool?' }, { question: 'Wanneer krijgen woorden een sacrale lading die de letterlijke betekenis overstijgt?' }] },
        ]
    },
    {
        code: 'CON_PS',
        name: 'Psychologische Conceptie',
        description: 'Deze lens analyseert de psychologische processen en archetypen die in het ritueel tot uiting komen. Het onderzoekt hoe het ritueel persoonlijke groei, schaduwwerk en innerlijke transformatie weerspiegelt.',
        categories: ['interpreteren'],
        subCodes: [
            { code: 'ARC', name: 'Archetypische Analyse', type: 'Identificatie en duiding van archetypen.', prompts: [{ question: 'Welke archetypische figuren (bv. de Wijze Oude Man, de Held) zijn herkenbaar in de personages van het ritueel?' }, { question: 'Welke universele symbolen (bv. de Moeder, de Boom, de Reis) komen voor?' }] },
            { code: 'IND', name: 'Individuatieproces', type: 'Analyse van het ritueel als metafoor voor individuatie.', prompts: [{ question: 'Hoe spiegelt de progressie door de graden de stadia van het individuatieproces?' }, { question: 'Welke rituele elementen symboliseren psychologische groei?' }] },
            { code: 'SHA', name: 'Schaduwwerk', type: "Onderzoek naar de confrontatie met de 'Schaduw'.", prompts: [{ question: 'Op welke momenten wordt de kandidaat geconfronteerd met duisternis, beproeving, of het onbekende?' }, { question: 'Hoe symboliseren deze elementen de confrontatie met de eigen Schaduw?' }] },
            { code: 'ANI', name: 'Anima / Animus', type: "Analyse van het 'andere' geslacht binnen de psyche.", prompts: [{ question: "Welke symbolen representeren het receptieve/verbindende (Anima) of het structurerende/assertieve (Animus) principe?" }, { question: 'Hoe wordt de integratie van deze aspecten in het ritueel verbeeld?' }] },
            { code: 'PER', name: 'Persona', type: 'Analyse van het sociale masker.', prompts: [{ question: "Hoe symboliseert het 'afleggen der metalen' het loslaten van de sociale status en het ego?" }, { question: 'Nodigt het ritueel uit om voorbij de uiterlijke schijn te zoeken?' }] },
            { code: 'SEL', name: 'Het Zelf', type: "Duiding van symbolen die verwijzen naar 'het Zelf'.", prompts: [{ question: 'Welke symbolen representeren heelheid of het ultieme spirituele doel (bv. de Tempel, het Oog)?' }, { question: 'Hoe wordt de relatie tussen het Ego en het Zelf uitgebeeld?' }] },
        ]
    },
    {
        code: 'CON_PSA',
        name: 'Psychologisch-Alchemistische Conceptie',
        description: 'Deze lens bekijkt het ritueel als een psychologisch transformatieproces, geïnspireerd door alchemistische symboliek. Het legt de nadruk op de fasen van innerlijke bewerking en de vereniging van tegenstellingen.',
        categories: ['interpreteren'],
        subCodes: [
            { code: 'MAT', name: 'Prima Materia (De Psychische Grondstof)', type: 'Analyse van de beginstaat als ongedifferentieerd potentieel.', prompts: [{ question: "Hoe wordt de kandidaat voorgesteld als prima materia: chaotisch, onbewust, maar met de potentie voor 'goud' in zich?" }, { question: "Welke rituele elementen (blinddoek, Donkere Kamer, 'onwetendheid') symboliseren deze staat van onbewerkt psychisch materiaal?" }] },
            { code: 'OPE', name: 'Het Alchemistische Werk (De Operaties)', type: 'Analyse van het ritueel als een reeks psychologische operaties.', prompts: [{ question: "Welke alchemistische operaties zijn symbolisch herkenbaar? Bijv. solutio, separatio, coagulatio." }, { question: "Hoe manifesteren de grote fasen zich: nigredo, albedo, en rubedo?" }] },
            { code: 'CON', name: 'Coniunctio (De Eenwording der Tegendelen)', type: 'Analyse van het proces van het integreren van psychische dualiteiten.', prompts: [{ question: "Welke symbolen en handelingen stellen de 'Heilige Bruiloft' voor?" }, { question: 'Hoe wordt de spanning tussen tegenstellingen opgebouwd en tot een synthese gebracht?' }] },
            { code: 'VAS', name: 'Het Vuur & Het Vat (Ignis & Vas)', type: 'Analyse van de voorwaarden voor transformatie: de container en de energie.', prompts: [{ question: 'Hoe functioneert de Loge als het alchemistische vas (vat)?' }, { question: "Wat is de ignis (het vuur) dat het proces aandrijft?" }] },
            { code: 'LAP', name: 'De Steen der Wijzen (Lapis Philosophorum)', type: 'Analyse van het einddoel als symbool voor het geïntegreerde Zelf.', prompts: [{ question: "Hoe is de 'volmaakte' Meester of de Kubieke Steen een symbool voor de Lapis?" }, { question: 'Welke eigenschappen van de Lapis worden weerspiegeld in het ideaal van de Meester-Vrijmetselaar?' }] },
        ]
    },
    {
        code: 'CON_F',
        name: 'Filosofische Conceptie',
        description: 'Deze lens onderzoekt de onderliggende filosofische ideeën en waarden in het ritueel, en hoe deze concepten de maçonnieke reis vormgeven.',
        categories: ['interpreteren'],
        subCodes: [
            { code: 'STO', name: 'Stoïcijnse Invloeden', type: 'Analyse van deugd, rede en aanvaarding.', prompts: [{ question: 'Welke rituele elementen benadrukken zelfbeheersing en het beheersen van passies?' }, { question: 'Hoe wordt het concept van het lot of de natuurlijke orde (Logos) verbeeld?' }] },
            { code: 'PLA', name: 'Platonische Invloeden', type: 'Analyse van de wereld van ideeën en de zoektocht naar het Ware, Goede en Schone.', prompts: [{ question: 'Hoe symboliseert het ritueel de reis van de schaduwwereld (grot) naar het licht van de kennis?' }, { question: 'Welke symbolen verwijzen naar een hogere, onzichtbare werkelijkheid?' }] },
            { code: 'HER', name: 'Hermetische Invloeden', type: 'Analyse van de correspondentie tussen micro- en macrokosmos ("Zo boven, zo beneden").', prompts: [{ question: 'Hoe wordt de mens voorgesteld als een spiegel van het universum?' }, { question: 'Welke rituele handelingen symboliseren de eenwording van tegenstellingen?' }] },
            { code: 'EXI', name: 'Existentialistische Thema\'s', type: 'Analyse van vrijheid, verantwoordelijkheid en zingeving.', prompts: [{ question: 'Hoe wordt de kandidaat geconfronteerd met de noodzaak om zijn eigen keuzes te maken?' }, { question: 'In hoeverre is het ritueel een antwoord op de existentiële angst voor het niets?' }] }
        ]
    },
    {
        code: 'CON_DRA',
        name: 'Dramaturgische Conceptie',
        description: 'Deze lens beschouwt het ritueel als een toneelstuk met een specifieke structuur, spanningsboog en rollen, gericht op het overbrengen van een centrale boodschap.',
        categories: ['analyseren'],
        subCodes: [
            { code: 'STR', name: 'Dramatische Structuur', type: 'Analyse van de opbouw (expositie, motorisch moment, climax, afloop).', prompts: [{ question: 'Wat is de centrale vraag of het conflict dat het ritueel voortstuwt?' }, { question: 'Hoe wordt de spanning opgebouwd en weer afgebouwd gedurende het ritueel?' }] },
            { code: 'PER', name: 'Personages & Rollen', type: 'Analyse van de functie van de verschillende personages.', prompts: [{ question: 'Welke rol vervult de kandidaat (protagonist)? Welke transformatie maakt hij door?' }, { question: 'Welke functie hebben de officieren van de loge binnen het drama?' }] },
            { code: 'DIA', name: 'Dialoog & Monoloog', type: 'Analyse van de gesproken tekst als dramatisch middel.', prompts: [{ question: 'Wat onthult de dialoog over de relaties tussen de personages?' }, { question: 'Welke monologen dienen als keerpunt of moment van inzicht?' }] }
        ]
    },
    {
        code: 'CON_TH',
        name: 'Theatrale Conceptie',
        description: 'Deze lens focust op de theatrale middelen die worden ingezet om het ritueel tot een indringende en betekenisvolle ervaring te maken.',
        categories: ['analyseren'],
        subCodes: [
            { code: 'SCE', name: 'Scenografie & Ruimte', type: 'Analyse van de inrichting van de ruimte en de objecten.', prompts: [{ question: 'Hoe wordt de tempelruimte gebruikt om een specifieke sfeer of symbolische wereld te creëren?' }, { question: 'Welke betekenis hebben de rekwisieten (kolommen, altaar, lichtbronnen)?' }] },
            { code: 'L&G', name: 'Licht & Geluid', type: 'Analyse van de inzet van licht, duisternis, muziek en stilte.', prompts: [{ question: 'Op welke momenten wordt de overgang van donker naar licht (of andersom) theatraal ingezet?' }, { question: 'Welke rol speelt muziek of geluid in het versterken van de emotionele impact?' }] },
            { code: 'COS', name: 'Kostumering & Attributen', type: 'Analyse van kledij en uiterlijke kenmerken.', prompts: [{ question: 'Wat communiceert de specifieke kledij (schootsvel, handschoenen) over de status en rol van de deelnemers?' }, { question: 'Hoe dragen de kostuums bij aan het gevoel van het betreden van een andere werkelijkheid?' }] }
        ]
    },
    {
        code: 'CON_FE',
        name: 'Fenomenologische Conceptie',
        description: 'Deze lens onderzoekt de directe, zintuiglijke en lichamelijke ervaring van het ritueel. Hoe wordt het ritueel door de deelnemer, en met name de kandidaat, *beleefd*?',
        categories: ['toepassen', 'interpreteren'],
        subCodes: [
            { code: 'LICH', name: 'Lichamelijkheid', type: 'Analyse van fysieke handelingen, houdingen en bewegingen.', prompts: [{ question: 'Welke fysieke sensaties (geblinddoekt, geleid worden) ervaart de kandidaat?' }, { question: 'Wat is de betekenis van specifieke lichaamshoudingen op sleutelmomenten?' }] },
            { code: 'ZINT', name: 'Zintuiglijkheid', type: 'Analyse van wat er wordt waargenomen.', prompts: [{ question: 'Hoe wordt de zintuiglijke waarneming van de kandidaat gemanipuleerd (bv. door de blinddoek)?' }, { question: 'Welke zintuiglijke indrukken dragen bij aan de sacrale sfeer?' }] },
            { code: 'RUIM', name: 'Ruimtelijke Beleving', type: 'Analyse van hoe de kandidaat de ruimte ervaart en zich daarin beweegt.', prompts: [{ question: 'Hoe wordt de ervaring van de ruimte beïnvloed door het geleid worden?' }, { question: 'Welke betekenis heeft de reis die de kandidaat fysiek aflegt door de tempel?' }] }
        ]
    },
    {
        code: 'CON_AG',
        name: 'Agogische Conceptie',
        description: 'Deze lens analyseert het ritueel als een doelgericht veranderings- en leerproces. Hoe is het ritueel ontworpen om de kandidaat te begeleiden, te onderwijzen en te vormen?',
        categories: ['toepassen'],
        subCodes: [
            { code: 'DID', name: 'Didactische Methoden', type: 'Analyse van de leermethoden (ervaringsleren, symbolisch leren).', prompts: [{ question: 'Hoe leert de kandidaat niet door intellectuele uitleg, maar door directe ervaring?' }, { question: 'Welke vragen worden gesteld om de kandidaat tot zelfreflectie aan te zetten?' }] },
            { code: 'BEG', name: 'Begeleiding & Mentorschap', type: 'Analyse van de rol van de begeleiders.', prompts: [{ question: 'Welke rol speelt de Broeder Voorbereider of de Expert in de begeleiding?' }, { question: 'Hoe wordt een veilige leeromgeving gecreëerd?' }] },
            { code: 'LEER', name: 'Leerdoelen & Vorming', type: 'Analyse van de beoogde verandering in kennis, houding en gedrag.', prompts: [{ question: 'Welke specifieke deugden of inzichten moet de kandidaat ontwikkelen?' }, { question: 'Hoe is het ritueel gestructureerd om een graduele leerervaring te bieden?' }] }
        ]
    },
    {
        code: 'CON_TR',
        name: 'Transformatieve Conceptie',
        description: 'Deze lens focust op het ritueel als een proces van diepgaande persoonlijke transformatie, vaak beschreven in termen van overgangsfasen.',
        categories: ['toepassen', 'interpreteren'],
        subCodes: [
            { code: 'LIM', name: 'Liminaliteit', type: 'Analyse van de "tussenfase" waarin de kandidaat noch het een, noch het ander is.', prompts: [{ question: "Op welke manier bevindt de kandidaat zich in een liminale status, losgemaakt van zijn oude identiteit?" }, { question: "Welke symbolen en handelingen benadrukken deze drempel-ervaring?" }] },
            { code: 'CAT', name: 'Catharsis', type: 'Analyse van emotionele zuivering en ontlading.', prompts: [{ question: "Wordt de kandidaat geconfronteerd met beproevingen die een emotionele reactie (angst, ontzag) uitlokken?" }, { question: "Hoe leidt het ritueel tot een gevoel van loutering of vernieuwing na deze beproevingen?" }] },
            { code: 'INT', name: 'Integratie', type: 'Analyse van de opname in de nieuwe gemeenschap en identiteit.', prompts: [{ question: "Welke handelingen symboliseren de re-integratie van de kandidaat in de gemeenschap met een nieuwe status?" }, { question: "Hoe wordt de nieuwe kennis of het nieuwe inzicht verankerd in de persoon?" }] }
        ]
    },
    {
        code: 'CON_AN',
        name: 'Antropologische Conceptie',
        description: 'Deze lens bestudeert het ritueel als een cultureel fenomeen, vergelijkbaar met andere overgangsrituelen en mythische structuren in menselijke samenlevingen.',
        categories: ['analyseren', 'interpreteren'],
        subCodes: [
            { code: 'RDP', name: 'Rite de Passage', type: 'Analyse volgens Van Genneps model (separatie, transitie, incorporatie).', prompts: [{ question: "Hoe zijn de drie fasen van een 'rite de passage' herkenbaar in het maçonnieke ritueel?" }, { question: "Wat is de sociale functie van dit overgangsritueel voor de groep en het individu?" }] },
            { code: 'MYTH', name: 'Mythische Kaders', type: 'Analyse van de onderliggende mythen die het ritueel structureren.', prompts: [{ question: "Welke universele mythen (de reis van de held, de dood en wedergeboorte) klinken door in het ritueel?" }, { question: "Hoe functioneert de Hiram-mythe als de centrale, structurerende mythe?" }] },
            { code: 'COMM', name: 'Communitas', type: 'Analyse van het gevoel van verbondenheid en gelijkheid dat tijdens het ritueel ontstaat.', prompts: [{ question: "Op welke manier wordt de hiërarchie van de buitenwereld tijdelijk opgeheven?" }, { question: "Welke elementen dragen bij aan het creëren van een intense band tussen de deelnemers?" }] }
        ]
    },
    {
        code: 'CON_E',
        name: 'Esthetische Conceptie',
        description: 'Deze lens richt zich op de zintuiglijke en artistieke kwaliteiten van het ritueel en onderzoekt hoe schoonheid en harmonie bijdragen aan de betekenisgeving.',
        categories: ['interpreteren'],
        subCodes: [
            { code: 'HAR', name: 'Harmonie & Compositie', type: 'Analyse van de balans en samenhang van de verschillende rituele elementen.', prompts: [{ question: "Hoe creëren de symmetrie van de tempelopstelling en de choreografie van de bewegingen een gevoel van orde en harmonie?" }, { question: "Op welke manier vloeien woord, gebaar, en muziek samen tot een esthetisch geheel?" }] },
            { code: 'SUB', name: 'Het Sublieme', type: 'Analyse van ervaringen die ontzag, grootsheid en overweldiging oproepen.', prompts: [{ question: "Welke elementen in het ritueel (bv. stilte, duisternis, plechtige taal) roepen een gevoel van het sublieme op?" }, { question: "Hoe wordt de nietigheid van het individu ten opzichte van het 'Grote Andere' esthetisch ervaren?" }] }
        ]
    },
    {
        code: 'CON_ETH',
        name: 'Ethische Conceptie',
        description: 'Deze lens analyseert het ritueel als een vehikel voor de overdracht en inoefening van een specifiek ethisch kader of waardensysteem.',
        categories: ['interpreteren', 'toepassen'],
        subCodes: [
            { code: 'DEUGD', name: 'Deugdethiek', type: 'Analyse van de centrale deugden die worden voorgesteld en ingeoefend.', prompts: [{ question: "Welke maçonnieke deugden (bv. verdraagzaamheid, broederliefde, standvastigheid) worden expliciet of impliciet onderwezen?" }, { question: "Hoe wordt de kandidaat aangespoord om een deugdzaam karakter te ontwikkelen?" }] },
            { code: 'WAAR', name: 'Waarden & Normen', type: 'Analyse van de onderliggende waarden die het handelen van de vrijmetselaar moeten sturen.', prompts: [{ question: "Welke waarden worden in het ritueel als fundamenteel gepresenteerd?" }, { question: "Hoe worden deze waarden vertaald naar concrete gedragsnormen binnen en buiten de loge?" }] },
            { code: 'MOR', name: 'Moreel Dilemma', type: 'Analyse van situaties die de kandidaat voor een morele keuze of beproeving plaatsen.', prompts: [{ question: "Wordt de kandidaat in het ritueel geconfronteerd met symbolische morele dilemma's?" }, { question: "Hoe test het ritueel de morele integriteit en betrouwbaarheid van de kandidaat?" }] }
        ]
    },
    {
        code: "CON_DYN",
        name: "Dynamische of processuele conceptie",
        description: "Deze lens analyseert het ritueel als een ontvouwend proces. De focus ligt op de interacties, energiestromen en emergente eigenschappen die ontstaan tijdens de uitvoering. Het onderzoekt wat het ritueel doet.",
        categories: ['analyseren', 'interpreteren'],
        subCodes: [
        {
            code: "PERF",
            name: "Performativiteit",
            type: "Analyse van het ritueel als een scheppende handeling.",
            prompts: [
                { question: "Welke realiteit wordt door het uitspreken van een specifieke formule gecreëerd (bv. 'Ik verklaar u nu Leerling')?" },
                { question: "Hoe verandert de 'status' van de kandidaat niet door een idee, maar door de fysieke voltooiing van een handeling?" }
            ]
        },
        {
            code: "EMER",
            name: "Emergentie",
            type: "Onderzoek naar betekenis die ontstaat uit de interactie.",
            prompts: [
                { question: "Welke gezamenlijke sfeer of groepsgevoel ontstaat er dat niet vooraf in het script stond?" },
                { question: "Op welk moment ontstaat er een 'magisch' of betekenisvol inzicht dat niet in de totale constellatie besloten ligt?" }
            ]
        },
        {
            code: "AFFL",
            name: "Affectieve Stromen",
            type: "Analyse van de circulatie van energie, sfeer en intensiteit.",
            prompts: [
                { question: "Waar in het ritueel bouwt de spanning of de energetische lading zich op? Waar en hoe wordt deze weer losgelaten?" },
                { question: "Hoe 'beweegt' de sfeer door de ruimte? Welke rol spelen geluid, stilte, snelheid en ritme in deze dynamiek?" }
            ]
        },
        {
            code: "RELA",
            name: "Relationele Velden",
            type: "Analyse van het web van relaties tussen mensen, objecten, ruimte en taal.",
            prompts: [
                { question: "Hoe wordt betekenis gegenereerd in de interactie tússen de kandidaat en de blinddoek, in plaats van in de blinddoek zelf?" },
                { question: "Welke nieuwe dynamieken ontstaan er wanneer specifieke 'actoren' (bv. de Meester, een zwaard, een lichtbron) met elkaar in een bepaalde ruimtelijke verhouding worden gebracht?" }
            ]
        }
    ]
    },
    {
      code: "CON_SOC",
      name: "Sociologische Conceptie",
      description: "Deze lens analyseert het ritueel als een sociaal bindmiddel. Het onderzoekt de groepsdynamiek, sociale functies en hoe het ritueel de gemeenschap structureert, bevestigt en legitimeert.",
      categories: ['analyseren'],
      subCodes: [
        {
          code: "ROL",
          name: "Sociale Rollen & Status",
          type: "Analyse van de verdeling van rollen en de (her)bevestiging van sociale status.",
          prompts: [
            { question: "Hoe definieert en legitimeert het ritueel de verschillende sociale rollen binnen de groep (bv. officieren, leden)?" },
            { question: "Op welke manier wordt sociale status zowel tijdelijk opgeheven (communitas) als opnieuw bevestigd?" }
          ]
        },
        {
          code: "NORM",
          name: "Normatieve Inlijving",
          type: "Onderzoek naar hoe het ritueel de normen en waarden van de groep overdraagt en verankert.",
          prompts: [
            { question: "Welke ongeschreven regels en gedragscodes worden via het ritueel gecommuniceerd?" },
            { question: "Hoe functioneert het ritueel als een mechanisme voor sociale controle en cohesie?" }
          ]
        },
        {
          code: "INEX",
          name: "Inclusie & Exclusie",
          type: "Analyse van de mechanismen die bepalen wie tot de groep behoort en wie wordt buitengesloten.",
          prompts: [
            { question: "Welke symbolische grenzen trekt het ritueel tussen 'binnen' en 'buiten'?" },
            { question: "Hoe creëert het ritueel een collectieve identiteit door zich te onderscheiden van de buitenwereld?" }
          ]
        },
        {
          code: "CAP",
          name: "Symbolisch kapitaal",
          type: "Analyse van het ritueel als een bron van sociaal en cultureel kapitaal (status, kennis, netwerk).",
          prompts: [
            { question: "Welke vorm van 'geheime' kennis of prestige verleent deelname aan het ritueel?" },
            { question: "Hoe draagt de rituele ervaring bij aan de sociale status van de deelnemers buiten de groep?" }
          ]
        }
      ]
    },
    {
      code: "CON_HC",
      name: "Historisch-Contextuele Conceptie",
      description: "Deze lens plaatst het ritueel in zijn historische context. Het onderzoekt de oorsprong, evolutie en de invloed van de tijdgeest op de symbolen, handelingen en teksten.",
      categories: ['analyseren'],
      subCodes: [
        {
          code: "GEN",
          name: "Genese & Bronnenonderzoek",
          type: "Analyse van de historische oorsprong en de bronnen van het ritueel.",
          prompts: [
            { question: "Uit welke historische bronnen (bv. oudere mysteriën, gilden, religieuze teksten) put het ritueel?" },
            { question: "Wat was de oorspronkelijke intentie of functie van specifieke rituele elementen?" }
          ]
        },
        {
          code: "EVO",
          name: "Evolutie & Traditie",
          type: "Onderzoek naar de veranderingen die het ritueel door de tijd heeft ondergaan.",
          prompts: [
            { question: "Hoe is het ritueel aangepast of geherinterpreteerd in verschillende historische periodes?" },
            { question: "Welke elementen zijn constant gebleven en welke zijn verdwenen of toegevoegd, en waarom?" }
          ]
        },
        {
          code: "RECEP",
          name: "Receptiegeschiedenis",
          type: "Analyse van hoe het ritueel in verschillende tijden werd geïnterpreteerd en begrepen.",
          prompts: [
            { question: "Hoe heeft de betekenis van een centraal symbool (bv. de 'Opperbouwmeester des Heelals') zich in de loop der tijd ontwikkeld?" },
            { question: "Welke controverses of maatschappelijke debatten hebben de interpretatie van het ritueel beïnvloed?" }
          ]
        }
      ]
    },
    {
      code: "CON_MB",
      name: "Materiële & belichaamde conceptie",
      description: "Deze lens focust op de concrete, materiële en fysieke aspecten van het ritueel. Het onderzoekt hoe objecten, de ruimte en het lichaam zelf kennis en betekenis dragen, voorbij de puur symbolische duiding.",
      categories: ['analyseren', 'toepassen'],
      subCodes: [
        {
          code: "AFF",
          name: "Affect & atmosfeer",
          type: "Analyse van de 'gevoelskwaliteit' die door de materiële omgeving wordt opgewekt.",
          prompts: [
            { question: "Hoe dragen de materialen (hout, steen, textiel), de akoestiek en de temperatuur bij aan de sfeer?" },
            { question: "Welk 'affect' of welke stemming wordt door de combinatie van objecten en ruimte gegenereerd, nog voordat er iets gezegd is?" }
          ]
        },
        {
          code: "EMB",
          name: "Embodied Knowledge",
          type: "Analyse van kennis die in het lichaam wordt opgeslagen door rituele handelingen.",
          prompts: [
            { question: "Welke kennis wordt niet intellectueel, maar fysiek 'geleerd' door houdingen, gebaren en bewegingen?" },
            { question: "Hoe vormt de herhaling van fysieke handelingen het 'lichaamsgeheugen' van de ingewijde?" }
          ]
        },
        {
          code: "AGEN",
          name: "Agency van Objecten",
          type: "Onderzoek naar de actieve rol die objecten spelen in het ritueel.",
          prompts: [
            { question: "Hoe 'handelen' de rituele objecten zelf? Welke effecten hebben ze op de deelnemers (bv. een passer die 'dwingt' tot precisie)?" },
            { question: "Worden bepaalde objecten behandeld alsof ze een eigen kracht of aanwezigheid hebben?" }
          ]
        }
      ]
    },
    {
      code: "CON_AGP",
      name: "Agogische Proces-Conceptie",
      description: "Deze lens analyseert het ritueel als een doelbewust ontworpen interventie gericht op psychosociale verandering en ontwikkeling. Het focust op de methodische begeleiding van de kandidaat door een gepland transformatieproces.",
      categories: ['toepassen'],
      subCodes: [
        {
          code: "INTV",
          name: "De rituele interventie",
          type: "Analyse van het ritueel als een actieve ingreep in de belevingswereld van de kandidaat.",
          prompts: [
            { question: "Op welke specifieke momenten wordt er bewust ingegrepen om de kandidaat uit zijn comfortzone te halen?" },
            { question: "Hoe is het ritueel ontworpen om bestaande overtuigingen of zelfbeelden te 'destabiliseren' om ruimte voor groei te maken?" }
          ]
        },
        {
          code: "ZELF",
          name: "Gestimuleerde zelfsturing",
          type: "Onderzoek naar hoe het ritueel de kandidaat aanzet tot het nemen van verantwoordelijkheid voor zijn eigen ontwikkeling.",
          prompts: [
            { question: "Welke vragen of keuzemomenten in het ritueel appelleren direct aan de eigen wil en het geweten van de kandidaat?" },
            { question: "Hoe wordt de kandidaat gestimuleerd om de rituele ervaringen zelfstandig te verwerken en te integreren in zijn leven?" }
          ]
        },
        {
          code: "FASA",
          name: "Fasering van verandering",
          type: "Analyse van de agogische opbouw van het proces in logische, opeenvolgende fasen.",
          prompts: [
            { question: "Hoe bouwen de verschillende 'beproevingen' of stadia van het ritueel logisch op elkaar voort in termen van psychologische impact?" },
            { question: "Op welke manier weerspiegelt de structuur van het ritueel een bekend model van verandering (bv. loslaten, verkennen, vastzetten)?" }
          ]
        }
      ]
    },
    {
      code: "CON_ANA",
      name: "Anagogische Conceptie",
      description: "Deze lens interpreteert het ritueel als een symbolische reis van de ziel naar een hogere, transcendente werkelijkheid. Het focust op de ultieme spirituele of eschatologische betekenis van de symbolen en handelingen.",
      categories: ['interpreteren'],
      subCodes: [
        {
          code: "ASCE",
          name: "Spirituele Ascentia (Opstijging)",
          type: "Analyse van het ritueel als een pad van het aardse naar het hemelse, van het materiële naar het spirituele.",
          prompts: [
            { question: "Welke symbolen (bv. de reizen) verbeelden expliciet een spirituele opstijging?" },
            { question: "Hoe wordt de progressie door het ritueel geframed als een steeds dichter naderen tot een goddelijk of kosmisch principe?" }
          ]
        },
        {
          code: "ESCA",
          name: "Eschatologisch Perspectief",
          type: "Onderzoek naar verwijzingen naar een 'einddoel', een ultieme bestemming of een kosmische voleinding.",
          prompts: [
            { question: "Hoe verbeeldt het ritueel een ultieme staat van verlichting, voltooiing of 'thuiskomst'?" },
            { question: "Bevat het ritueel symbolen die verwijzen naar het overstijgen van de dood of de vergankelijkheid?" }
          ]
        },
        {
          code: "UNIO",
          name: "Unio Mystica (Eenwording)",
          type: "Analyse van symbolen en momenten die duiden op de vereniging van het individuele zelf met het 'Al' of het goddelijke.",
          prompts: [
            { question: "Welke rituele handelingen symboliseren het opheffen van de dualiteit tussen het 'ik' en de 'ander' of het 'ik' en het 'goddelijke'?" },
            { question: "Hoe wordt het eindpunt van de rituele reis voorgesteld als een staat van eenheid, harmonie en non-dualiteit?" }
          ]
        }
      ]
    },
    {
    code: "CON_SR",
    name: "Schotse Ritus Conceptie",
    description: "Deze lens analyseert het ritueel binnen de specifieke context van de Schotse Ritus. Het richt zich op de unieke narratieve lijn (de zoektocht naar het Verloren Woord), de gelaagde symboliek van de Hogere Graden, de integratie van ridderlijke en filosofische tradities, en het centrale thema van het 'bouwen aan de Tempel der Mensheid'.",
    categories: ['analyseren', 'interpreteren', 'toepassen'],
    subCodes: [
        {
            code: "VIA",
            name: "De Weg van de Kennis (Via Scientiae)",
            type: "Analyse van de graduele en progressieve openbaring van kennis.",
            prompts: [
                { question: "Op welke manier bouwt de symboliek of de boodschap van deze graad voort op de kennis van de voorgaande graden?" },
                { question: "Welke specifieke filosofische, historische of symbolische kennis wordt in dit ritueel geïntroduceerd en hoe draagt dit bij aan het grotere verhaal?" }
            ]
        },
        {
            code: "MIL",
            name: "Spiritueel Ridderschap (Militia Spiritualis)",
            type: "Analyse van de ridderlijke deugden, plichten en symboliek.",
            prompts: [
                { question: "Welke ridderlijke deugden (zoals moed, trouw, bescherming van de zwakkeren, waarheidszin) worden in dit ritueel benadrukt?" },
                { question: "Hoe wordt het conflict tussen licht en duisternis, of tussen deugd en ondeugd, uitgebeeld in termen van een innerlijke strijd of een heilige queeste?" }
            ]
        },
        {
            code: "RES",
            name: "Het Herstel van de Tempel (Restauratio Templi)",
            type: "Analyse van het ritueel als een symbolische daad van herstel en vervolmaking.",
            prompts: [
                { question: "Hoe draagt dit ritueel bij aan het symbolische herstel van de Tempel van Salomo (of de Tempel der Mensheid)?" },
                { question: "Welke symbolen van verlies, verval of duisternis worden in dit ritueel overwonnen of getransformeerd tot iets nieuws en constructiefs?" }
            ]
        },
        {
            code: "ALC",
            name: "De Alchemie van de Graden (Alchemia Graduum)",
            type: "Analyse van de transformatieve processen die door de graden heen werken.",
            prompts: [
                { question: "Hoe symboliseert deze graad een specifieke fase in een psychologisch of spiritueel transformatieproces (bv. confrontatie, loutering, verlichting, eenwording)?" },
                { question: "Welke symbolische 'werktuigen' of 'elementen' worden in dit ritueel aangereikt om de 'ruwe steen' van de persoonlijkheid verder te bewerken?" }
            ]
        },
        {
            code: "SYN",
            name: "Filosofisch Syncretisme (Syncretismus Philosophicus)",
            type: "Analyse van de synthese van verschillende filosofische en esoterische tradities.",
            prompts: [
                { question: "Welke specifieke filosofische of mystieke tradities (bv. Hermetisme, Kabbala, Stoïcisme) zijn herkenbaar in de symbolen, taal of structuur van dit ritueel?" },
                { question: "Hoe creëert het ritueel een synthese tussen schijnbaar verschillende concepten (bv. geloof en rede, individu en gemeenschap, materie en geest)?" }
            ]
        }
    ]
}
];

// --- SYNTHESIS EXAMPLES --- //

export const SYNTHESIS_EXAMPLES: SynthesisExample[] = [
    {
        title: "De Innerlijke Reis",
        description: "Analyseert de initiatie als een psychologisch en alchemistisch proces van innerlijke transformatie en zelfontdekking.",
        ritualText: "Geleid door de hand van een vriend, betreedt de geblinddoekte kandidaat de tempel. Hij wordt ontdaan van zijn metalen, symbolen van zijn profane status. In de stilte van de Kamer van Overdenking wordt hij geconfronteerd met symbolen van vergankelijkheid en de vraag: 'Wat komt gij hier doen?'. Dit markeert het begin van zijn eerste reis, een tocht door duisternis en beproeving, op zoek naar het Licht.",
        lenses: [
            { lensCode: 'CON_PS', ...LENSES_DATA[1].subCodes.find(sc => sc.code === 'SHA')! }, // Psychologisch: Schaduwwerk
            { lensCode: 'CON_PSA', ...LENSES_DATA[2].subCodes.find(sc => sc.code === 'MAT')! }, // Alchemistisch: Prima Materia
            { lensCode: 'CON_AG', ...LENSES_DATA[7].subCodes.find(sc => sc.code === 'DID')! }, // Agogisch: Didactische Methoden
            { lensCode: 'CON_TR', ...LENSES_DATA[8].subCodes.find(sc => sc.code === 'LIM')! } // Transformatief: Liminaliteit
        ],
        synthesisText: "De aanvang van het inwijdingsritueel is een meesterlijk georkestreerde interventie in de psyche van de kandidaat. Door de lens van **liminaliteit** (CON_TR/LIM) wordt hij letterlijk en figuurlijk uit zijn vertrouwde wereld gehaald. Het afleggen der metalen en de blinddoek zijn niet louter symbolisch, maar creëren een 'tussen-staat' waarin de oude identiteit wordt afgebroken voordat een nieuwe kan worden opgebouwd.\n\nDit proces spiegelt direct de alchemistische fase van de **Prima Materia** (CON_PSA/MAT). De kandidaat, ontdaan van zijn sociale status, is de ongedifferentieerde 'eerste materie' – een staat van potentieel, maar ook van chaos en onwetendheid. De Kamer van Overdenking functioneert hierbij als het alchemistische vat waarin deze materie wordt voorbereid. De confrontatie met de eigen sterfelijkheid is een vorm van **schaduwwerk** (CON_PS/SHA), een noodzakelijke eerste stap waarin de kandidaat zijn eigen donkere, onbekende kanten onder ogen moet zien. Het is de afdaling in het zelf die aan de transformatie voorafgaat.\n\nTegelijkertijd is dit een krachtig agogisch proces. De **didactische methode** (CON_AG/DID) is er een van ervaringsleren. De kandidaat leert niet door intellectuele instructie, maar door de directe, fysieke en emotionele ervaring van desoriëntatie en afhankelijkheid. De vraag 'Wat komt gij hier doen?' is geen verzoek om informatie, maar een didactische interventie die de kandidaat dwingt tot zelfreflectie en het formuleren van zijn eigen intentie. De synthese van deze vier lenzen toont aan dat de eerste fase van het ritueel de kandidaat psychologisch, symbolisch en pedagogisch voorbereidt op de transformatie door hem eerst volledig te 'ont-doen', hem te confronteren met zijn eigen kernmateriaal, en hem in een staat van verhoogde ontvankelijkheid te brengen voor de lessen die komen gaan."
    },
    {
        title: "De Kosmische Tempel",
        description: "Onderzoekt de Logeruimte als een model van het universum, waarbij theatrale, filosofische en sociale elementen samenkomen.",
        ritualText: "De Achtbare Meester opent de Loge in de Eerste Graad. De lichten worden ontstoken, de officieren nemen hun plaatsen in. De ruimte, gesitueerd tussen de kolommen J en B, wordt een heilige en afgescheiden plaats. De Meester verklaart: 'De Loge is geopend.' De Broeders maken het teken. De werkzaamheden kunnen een aanvang nemen. De ruimte is niet langer een gewone zaal, maar een afspiegeling van het universum, gericht van Oost naar West, van de opkomst tot de ondergang van de zon.",
        lenses: [
            { lensCode: 'CON_TH', ...LENSES_DATA[5].subCodes.find(sc => sc.code === 'SCE')! }, // Theatraal: Scenografie
            { lensCode: 'CON_F', ...LENSES_DATA[3].subCodes.find(sc => sc.code === 'HER')! }, // Filosofisch: Hermetisme
            { lensCode: 'CON_AN', ...LENSES_DATA[9].subCodes.find(sc => sc.code === 'COMM')! }, // Antropologisch: Communitas
            { lensCode: 'CON_ANA', ...LENSES_DATA[16].subCodes.find(sc => sc.code === 'ASCE')! } // Anagogisch: Spirituele Opstijging
        ],
        synthesisText: "De opening van de Loge is een performatieve handeling die een gewone ruimte transformeert tot een kosmische tempel. Vanuit een **theatraal-scenografisch perspectief** (CON_TH/SCE) is dit een zorgvuldig geregisseerd stuk. Het ontsteken van de lichten, de vaste posities van de officieren en de symbolische rekwisieten (kolommen, altaar) zijn theatrale middelen die de ruimte sacraliseren en de deelnemers mentaal verplaatsen van de profane naar de sacrale wereld.\n\nDeze transformatie van de ruimte vindt haar filosofische grondslag in het **Hermetisme** (CON_F/HER). De Loge wordt expliciet een microkosmos, een afspiegeling van de macrokosmos ('zo boven, zo beneden'). De oriëntatie van Oost naar West en de symboliek van de hemellichamen maken de tempel tot een model van het universum. De handelingen zijn daardoor niet louter symbolisch, maar worden gezien als een harmoniseren van de innerlijke wereld van de Broeders met de kosmische orde.\n\nDeze gedeelde, symbolische ruimte creëert de voorwaarden voor wat antropologen **communitas** (CON_AN/COMM) noemen: een intens gevoel van verbondenheid en gelijkheid dat de sociale hiërarchie van de buitenwereld tijdelijk opheft. Door gezamenlijk de heilige ruimte te creëren en de rituele handelingen uit te voeren, wordt de groep als een hechte, spirituele eenheid gesmeed. De gedeelde focus op het 'werk' versterkt deze band.\n\nUiteindelijk krijgt dit alles een diepere, **anagogische betekenis** (CON_ANA/ASCE). De opening van de Loge is niet alleen de start van een vergadering, maar het begin van een symbolische spirituele opstijging. De fysieke ruimte wordt een metafoor voor een innerlijke, spirituele staat. Het betreden van de geopende Loge is daarmee een uitnodiging om het alledaagse bewustzijn achter zich te laten en een reis naar een hoger, meer verlicht perspectief te aanvaarden. De synthese van deze lenzen onthult dat de opening van de Loge een gelaagd proces is: het is een theatraal 'spel' dat een hermetische waarheid uitbeeldt, dat op zijn beurt een diepe sociale verbondenheid creëert als basis voor een collectieve spirituele opstijging."
    },
    {
        title: "De Spirituele Ridder",
        description: "Analyseert de Schotse Ritus als een pad van spiritueel ridderschap, gericht op deugd, plicht en de innerlijke strijd.",
        ritualText: "Met het zwaard gericht op zijn hart, legt de kandidaat zijn gelofte af. Hij zweert de waarheid te zoeken, de zwakken te beschermen en onrecht te bestrijden. Dit is geen strijd in de buitenwereld, maar de innerlijke strijd van de mens tegen zijn eigen onvolkomenheden. Hij wordt bekleed met de attributen van de ridder, niet als uiterlijk vertoon, maar als symbolen van de innerlijke kwaliteiten die hij moet ontwikkelen.",
        lenses: [
            { lensCode: 'CON_SR', ...LENSES_DATA.find(l => l.code === 'CON_SR')!.subCodes.find(sc => sc.code === 'MIL')! }, // Spiritueel Ridderschap
            { lensCode: 'CON_ETH', ...LENSES_DATA.find(l => l.code === 'CON_ETH')!.subCodes.find(sc => sc.code === 'DEUGD')! }, // Deugdethiek
            { lensCode: 'CON_PS', ...LENSES_DATA.find(l => l.code === 'CON_PS')!.subCodes.find(sc => sc.code === 'SHA')! }, // Schaduwwerk
            { lensCode: 'CON_TR', ...LENSES_DATA.find(l => l.code === 'CON_TR')!.subCodes.find(sc => sc.code === 'CAT')! } // Catharsis
        ],
        synthesisText: "De ridderlijke graden van de Schotse Ritus vormen een diepgaand ethisch en psychologisch pad. Het ritueel van de gelofte is, door de lens van **Spiritueel Ridderschap** (CON_SR/MIL), een performatieve toewijding aan een ideaal. Het zwaard symboliseert de scherpte van het geweten en de actieve strijd tegen onrecht, primair een innerlijke strijd. Dit wordt direct versterkt door de lens van **Deugdethiek** (CON_ETH/DEUGD), die de handeling framet als de actieve inoefening van deugden zoals trouw, moed en rechtvaardigheid. De kandidaat belooft niet slechts iets te doen, maar iemand te *worden*.\n\nDeze innerlijke strijd is in essentie een vorm van psychologisch **Schaduwwerk** (CON_PS/SHA). Het 'onrecht' en de 'onvolkomenheden' zijn manifestaties van de eigen schaduw. De rituele confrontatie is een symbolische erkenning van deze innerlijke duisternis, niet om haar te vernietigen, maar om haar te integreren en te beheersen. De emotionele intensiteit van dit moment, de confrontatie met de eigen idealen en tekortkomingen, fungeert als een **Catharsis** (CON_TR/CAT). Het is een louteringsproces waarbij de kandidaat wordt gezuiverd van zijn oude, onbewuste drijfveren om plaats te maken voor een bewuste, deugdzame levenshouding. De synthese toont dat het ridderschap hier geen romantische nostalgie is, maar een geavanceerd psychologisch model voor zelfontwikkeling, waarbij ethische idealen worden verankerd via een confronterend, louterend proces van zelfkennis."
    },
    {
        title: "De Bouw aan de Tempel",
        description: "Onderzoekt het ritueel als een constructieve daad van het herstellen van kennis en het bouwen aan een betere mensheid.",
        ritualText: "Na de dood van de Meester is de kennis verloren gegaan. De broeders trekken de wereld in, op zoek naar de fragmenten van het Verloren Woord. Elke reis brengt een nieuw inzicht, een nieuw stuk gereedschap. Met deze herwonnen kennis keren zij terug om de Tempel te herbouwen, niet van steen, maar van deugd en wijsheid. De arbeid is collectief; elke steen, hoe ruw ook, wordt gepolijst en ingepast in het grotere geheel.",
        lenses: [
            { lensCode: 'CON_SR', ...LENSES_DATA.find(l => l.code === 'CON_SR')!.subCodes.find(sc => sc.code === 'RES')! }, // Herstel van de Tempel
            { lensCode: 'CON_SR', ...LENSES_DATA.find(l => l.code === 'CON_SR')!.subCodes.find(sc => sc.code === 'VIA')! }, // Weg van de Kennis
            { lensCode: 'CON_SOC', ...LENSES_DATA.find(l => l.code === 'CON_SOC')!.subCodes.find(sc => sc.code === 'NORM')! }, // Normatieve Inlijving
            { lensCode: 'CON_AGP', ...LENSES_DATA.find(l => l.code === 'CON_AGP')!.subCodes.find(sc => sc.code === 'ZELF')! } // Gestimuleerde zelfsturing
        ],
        synthesisText: "Het centrale narratief van de Schotse Ritus is de symbolische opdracht tot het **Herstel van de Tempel** (CON_SR/RES). Dit is geen architecturale, maar een spirituele en maatschappelijke opdracht. De 'dood van de Meester' symboliseert het verlies van eenheid en wijsheid in de wereld. De daaropvolgende zoektocht is de **Weg van de Kennis** (CON_SR/VIA), een progressieve reis door filosofie, geschiedenis en ethiek om de 'fragmenten van het Verloren Woord' – de universele waarheden – te verzamelen. Elke graad is een stap op deze weg, die nieuwe inzichten en 'gereedschappen' aanreikt.\n\nDit proces heeft een sterke sociologische functie. Het collectieve 'bouwen' is een vorm van **Normatieve Inlijving** (CON_SOC/NORM). Door samen aan dit hogere doel te werken, internaliseren de deelnemers de waarden en normen van de gemeenschap: samenwerking, toewijding en het streven naar perfectie. Het ritueel creëert een blauwdruk voor een ideale samenleving, gebaseerd op gedeelde kennis en ethiek.\n\nUiteindelijk rust de verantwoordelijkheid voor deze bouw op het individu. De agogische lens van **Gestimuleerde Zelfsturing** (CON_AGP/ZELF) onthult dat het ritueel constant appelleert aan de eigen verantwoordelijkheid van de deelnemer. Hij moet zijn eigen 'ruwe steen' polijsten en actief bijdragen aan het geheel. De kennis wordt aangereikt, maar de toepassing ervan in de 'bouw' is een persoonlijke, ethische keuze. De synthese van deze lenzen toont een diepgaand model voor maatschappelijke en persoonlijke ontwikkeling: de vooruitgang van de mensheid (de Tempel) is onlosmakelijk verbonden met de individuele zoektocht naar kennis (de Weg) en de persoonlijke verantwoordelijkheid om die kennis ethisch toe te passen binnen een waardengedreven gemeenschap."
    },
    {
        title: "De Architectuur van de Ervaring",
        description: "Analyseert hoe fysieke en theatrale elementen een zintuiglijke sfeer creëren die de deelnemer in een andere staat van bewustzijn brengt.",
        ritualText: "De kandidaat betreedt de tempel. Het gedempte licht, de geur van wierook, de koele aanraking van de marmeren vloer en de harmonieuze proporties van de ruimte omvangen hem. De stilte wordt slechts doorbroken door de ritmische slagen van de hamer. Elk element is zorgvuldig gecomponeerd om de zintuigen te stemmen op het heilige.",
        lenses: [
            { lensCode: 'CON_TH', ...LENSES_DATA[5].subCodes.find(sc => sc.code === 'SCE')! },
            { lensCode: 'CON_MB', ...LENSES_DATA[15].subCodes.find(sc => sc.code === 'AFF')! },
            { lensCode: 'CON_E', ...LENSES_DATA[10].subCodes.find(sc => sc.code === 'HAR')! },
            { lensCode: 'CON_FE', ...LENSES_DATA[6].subCodes.find(sc => sc.code === 'ZINT')! }
        ],
        synthesisText: "De effectiviteit van het ritueel begint met de meesterlijke **architectuur van de ervaring**. De **scenografie** (CON_TH/SCE) van de tempel is niet slechts decoratief; het is een actieve component die een heilige ruimte afbakent. Deze ruimtelijke inrichting creëert, door de lens van **affect en atmosfeer** (CON_MB/AFF), een tastbare 'gevoelskwaliteit'. De materialen, het licht en de akoestiek genereren een sfeer van plechtigheid nog voordat er een woord is gesproken. Dit wordt versterkt door de **esthetische harmonie** (CON_E/HAR) van de compositie; de symmetrie en proporties spreken een non-verbale taal van orde en evenwicht. Uiteindelijk is het de directe **zintuiglijkheid** (CON_FE/ZINT) die de transformatie initieert. De manipulatie van wat de kandidaat ziet, hoort en voelt, haalt hem uit zijn alledaagse bewustzijn en maakt hem ontvankelijk voor de symbolische betekenis van de handelingen. De synthese toont dat het ritueel primair een belichaamde, zintuiglijke gebeurtenis is, waarbij de omgeving zelf het belangrijkste instrument voor verandering is."
    },
    {
        title: "De Sociale Machine",
        description: "Analyseert het ritueel als een mechanisme dat groepsidentiteit, sociale structuur en een collectieve werkelijkheid vormt.",
        ritualText: "De Achtbare Meester, bekleed met zijn tekenen van waardigheid, spreekt de openingswoorden. De Broeders, allen gelijk door hun schootsvel, antwoorden als één man. De deur wordt symbolisch gesloten, de buitenwereld buitengesloten. Door deze gezamenlijke handeling wordt de Loge niet alleen geopend, maar wordt de broederschap als een levende entiteit geconstitueerd.",
        lenses: [
            { lensCode: 'CON_SOC', ...LENSES_DATA[13].subCodes.find(sc => sc.code === 'ROL')! },
            { lensCode: 'CON_AN', ...LENSES_DATA[9].subCodes.find(sc => sc.code === 'COMM')! },
            { lensCode: 'CON_SOC', ...LENSES_DATA[13].subCodes.find(sc => sc.code === 'INEX')! },
            { lensCode: 'CON_DYN', ...LENSES_DATA[12].subCodes.find(sc => sc.code === 'PERF')! }
        ],
        synthesisText: "Het ritueel functioneert als een krachtige **sociale machine**. De openingsceremonie is een **performatieve** (CON_DYN/PERF) handeling bij uitstek: door de woorden uit te spreken, wórdt de Loge een heilige ruimte en de verzameling individuen een broederschap. Deze handeling definieert en bevestigt tegelijkertijd de **sociale rollen** (CON_SOC/ROL) binnen de groep; de Meester leidt, de Broeders volgen, en iedereen kent zijn plaats. Tegelijkertijd creëert het ritueel de voorwaarden voor **communitas** (CON_AN/COMM), een staat waarin de profane hiërarchie wordt vervangen door een gevoel van gelijkheid en intense verbondenheid, gesymboliseerd door het schootsvel. Dit proces van verbinding is onlosmakelijk verbonden met **inclusie en exclusie** (CON_SOC/INEX). Het sluiten van de deur is een krachtig symbool dat een grens trekt tussen 'binnen' en 'buiten', wat de collectieve identiteit versterkt. De synthese van deze lenzen laat zien dat het ritueel een dynamisch proces is dat door symbolische handelingen een complete sociale werkelijkheid creëert, met een eigen structuur, identiteit en grens."
    },
    {
        title: "De Innerlijke Alchemie",
        description: "Verbindt Jungiaanse psychologie met alchemie om de inwijding te duiden als een diepgaand proces van innerlijke transformatie.",
        ritualText: "Na zijn reizen door de elementen, na de confrontatie met zijn eigen sterfelijkheid, staat de kandidaat voor het altaar. Hier, in het centrum, worden de zon en de maan verenigd. Hij wordt onderwezen dat het ware meesterschap ligt in de verzoening van tegenstellingen: licht en duister, rede en gevoel. Hij is niet langer de onbewerkte steen, maar een werk in uitvoering, op weg naar heelheid.",
        lenses: [
            { lensCode: 'CON_PSA', ...LENSES_DATA[2].subCodes.find(sc => sc.code === 'MAT')! },
            { lensCode: 'CON_PS', ...LENSES_DATA[1].subCodes.find(sc => sc.code === 'IND')! },
            { lensCode: 'CON_PS', ...LENSES_DATA[1].subCodes.find(sc => sc.code === 'SEL')! },
            { lensCode: 'CON_PSA', ...LENSES_DATA[2].subCodes.find(sc => sc.code === 'CON')! }
        ],
        synthesisText: "De maçonnieke inwijding is een model van **innerlijke alchemie**. De kandidaat start als **Prima Materia** (CON_PSA/MAT), de onbewerkte, onbewuste psychische grondstof. Het ritueel is het alchemistische 'werk' dat deze grondstof bewerkt. Dit proces is een perfecte metafoor voor het Jungiaanse **individuatieproces** (CON_PS/IND), de levenslange reis van het ego naar een diepere verbinding met het Zelf. Het uiteindelijke doel van dit proces is de realisatie van **het Zelf** (CON_PS/SEL), het archetypische symbool van psychische heelheid en totaliteit, vaak verbeeld door de volmaakte kubieke steen. Een cruciale stap hierin is de **Coniunctio** (CON_PSA/CON), de 'heilige bruiloft' of eenwording der tegendelen. De vereniging van zon en maan op het altaar symboliseert de integratie van bewust en onbewust, mannelijk en vrouwelijk, denken en voelen. De synthese toont dat het ritueel geen moralistische les is, maar een symbolische routekaart voor het diepste psychologische proces dat een mens kan ondergaan: het worden van wie men werkelijk is."
    },
    {
        title: "De Morele Reis",
        description: "Onderzoekt het ritueel als een school voor ethiek en de ontwikkeling van deugdzaamheid, met de nadruk op persoonlijke verantwoordelijkheid.",
        ritualText: "De kandidaat wordt een onafgewerkte opdracht voorgelegd, een moreel dilemma verhuld in symboliek. Er is geen juist antwoord in het boek. Hij moet handelen op basis van zijn geweten, zijn passies beheersend, en de verantwoordelijkheid voor zijn keuze dragen. Zijn reactie wordt niet beoordeeld, maar dient als spiegel voor zijn eigen innerlijke kompas.",
        lenses: [
            { lensCode: 'CON_ETH', ...LENSES_DATA[11].subCodes.find(sc => sc.code === 'DEUGD')! },
            { lensCode: 'CON_F', ...LENSES_DATA[3].subCodes.find(sc => sc.code === 'STO')! },
            { lensCode: 'CON_ETH', ...LENSES_DATA[11].subCodes.find(sc => sc.code === 'MOR')! },
            { lensCode: 'CON_AGP', ...LENSES_DATA[16].subCodes.find(sc => sc.code === 'ZELF')! }
        ],
        synthesisText: "Het ritueel is een oefenplaats voor de ziel, een **morele reis**. Door de kandidaat te confronteren met een **moreel dilemma** (CON_ETH/MOR), wordt een actieve ethische reflectie uitgelokt. Dit is geen theoretische les, maar een praktische oefening in **deugdethiek** (CON_ETH/DEUGD), waar het erom gaat een goed karakter te vormen, niet alleen regels te volgen. De aanpak vindt een sterke echo in de **Stoïcijnse invloeden** (CON_F/STO), die de nadruk leggen op zelfbeheersing en het handelen in overeenstemming met de rede, onverstoord door passies. Het open einde van het dilemma is een krachtig agogisch middel dat **gestimuleerde zelfsturing** (CON_AGP/ZELF) bevordert. De kandidaat wordt gedwongen zijn eigen morele autoriteit te zijn. De synthese laat zien hoe het ritueel een veilige ruimte creëert om de complexiteit van ethisch handelen te ervaren, en de kandidaat traint in de kunst van het maken van bewuste, verantwoordelijke keuzes."
    },
    {
        title: "Het Kosmisch Drama",
        description: "Analyseert het ritueel als een mythisch toneelstuk over de zoektocht naar transcendente waarheid en de plaats van de mens in de kosmos.",
        ritualText: "Het verhaal van de Meester-bouwer wordt niet verteld, maar herleefd. De kandidaat neemt deel aan een tijdloos drama, een mythe over verlies, zoeken en de hoop op herstel. Hij doorloopt de stadia van dit heilige verhaal, en wordt zo zelf een schakel in een keten die de kosmos omspant, van de aarde tot de sterren.",
        lenses: [
            { lensCode: 'CON_DRA', ...LENSES_DATA[4].subCodes.find(sc => sc.code === 'STR')! },
            { lensCode: 'CON_F', ...LENSES_DATA[3].subCodes.find(sc => sc.code === 'HER')! },
            { lensCode: 'CON_AN', ...LENSES_DATA[9].subCodes.find(sc => sc.code === 'MYTH')! },
            { lensCode: 'CON_ANA', ...LENSES_DATA[17].subCodes.find(sc => sc.code === 'ASCE')! }
        ],
        synthesisText: "Het ritueel is een **kosmisch drama**. Het volgt een klassieke **dramatische structuur** (CON_DRA/STR) met een duidelijk conflict, een climax en een ontknoping. Dit drama is echter geen willekeurig verhaal, maar is ingebed in **mythische kaders** (CON_AN/MYTH) zoals de 'reis van de held' of 'dood en wedergeboorte', die universele menselijke ervaringen weerspiegelen. De filosofische onderbouwing van dit drama is diep **hermetisch** (CON_F/HER): wat er in de microkosmos van het ritueel gebeurt, spiegelt de processen in de macrokosmos. Deelnemen aan het ritueel is deelnemen aan de kosmische orde. Uiteindelijk heeft dit drama een **anagogische** (CON_ANA/ASCE) functie: het is ontworpen om de ziel te verheffen. De reis van de protagonist is een metafoor voor de spirituele opstijging van de mens, van het aardse naar het goddelijke. De synthese onthult dat het ritueel theater, mythe en filosofie combineert om de deelnemer niet alleen een verhaal te laten zien, maar hem er deelgenoot van te maken en hem zo te verheffen."
    },
    {
        title: "De Queeste van de Schotse Ritus",
        description: "Focust op het centrale narratief van de Schotse Ritus, dat draait om verlies, de zoektocht naar kennis en het herstel van de spirituele tempel.",
        ritualText: "Het Verloren Woord is de drijfveer. Gedreven door de plicht van de spirituele ridder, begint de zoektocht. De reis voert door de ruïnes van de geschiedenis, langs de lessen van filosofen en wijzen. Elke stap is een stap op de weg van kennis, met als einddoel niet alleen het woord te vinden, maar de Tempel in zichzelf en in de wereld te herbouwen.",
        lenses: [
            { lensCode: 'CON_SR', ...LENSES_DATA[18].subCodes.find(sc => sc.code === 'RES')! },
            { lensCode: 'CON_SR', ...LENSES_DATA[18].subCodes.find(sc => sc.code === 'MIL')! },
            { lensCode: 'CON_HC', ...LENSES_DATA[14].subCodes.find(sc => sc.code === 'GEN')! },
            { lensCode: 'CON_SR', ...LENSES_DATA[18].subCodes.find(sc => sc.code === 'VIA')! }
        ],
        synthesisText: "Het narratief van de Schotse Ritus is een epische queeste. Het centrale motief is het **herstel van de Tempel** (CON_SR/RES), een metafoor voor het herstellen van wijsheid en harmonie in de wereld. De protagonist op deze queeste is de **spirituele ridder** (CON_SR/MIL), die zich met moed en trouw inzet voor dit hogere doel. De route die hij volgt is de **Weg van de Kennis** (CON_SR/VIA), een pad dat door de verschillende graden leidt en steeds diepere inzichten onthult. Een analyse van de **genese en bronnen** (CON_HC/GEN) van deze rituelen toont aan hoe dit narratief is geweven uit historische, filosofische en mythische draden. De queeste is geen fictief verhaal, maar een symbolische reis die de ingewijde verbindt met een eeuwenoude traditie van zoeken naar waarheid. De synthese van deze lenzen toont dat de Schotse Ritus een coherent en gelaagd pad van ontwikkeling biedt, waarin een ridderlijk ethos wordt gekoppeld aan een intellectuele en spirituele zoektocht, geworteld in een rijke historische context."
    },
    {
        title: "Taal als Magie",
        description: "Onderzoekt hoe taal, verhalen en performatieve formules de rituele werkelijkheid niet beschrijven, maar actief scheppen.",
        ritualText: "De Voorzittend Meester heft zijn hamer en spreekt de formule: 'In naam van de Opperbouwmeester des Heelals en krachtens de mij verleende macht, verklaar ik deze Loge voor geopend.' Door deze woorden wordt de ruimte getransformeerd, de tijd opgeschort. Een verhaal begint, waarin elk woord een geladen betekenis draagt.",
        lenses: [
            { lensCode: 'CON_TA', ...LENSES_DATA[0].subCodes.find(sc => sc.code === 'SE')! },
            { lensCode: 'CON_DYN', ...LENSES_DATA[12].subCodes.find(sc => sc.code === 'PERF')! },
            { lensCode: 'CON_TA', ...LENSES_DATA[0].subCodes.find(sc => sc.code === 'NA')! },
            { lensCode: 'CON_TA', ...LENSES_DATA[0].subCodes.find(sc => sc.code === 'SYM')! }
        ],
        synthesisText: "In het ritueel is taal een vorm van magie. De openingswoorden zijn geen beschrijving, maar een **performatieve** (CON_DYN/PERF) taalhandeling: het uitspreken ervan schept de realiteit van de 'geopende Loge'. Deze handeling opent tevens de **narratieve kaders** (CON_TA/NA) waarbinnen de rest van het ritueel zich zal afspelen. Binnen dit verhaal krijgt elk woord een specifieke **semantische lading** (CON_TA/SE); 'Licht' betekent meer dan fysieke helderheid, en 'bouwen' verwijst naar spirituele arbeid. Op de meest plechtige momenten treedt **talige symbolisatie** (CON_TA/SYM) op: de taal zelf wordt een symbool. Het 'Woord' is niet zomaar een woord, maar een representatie van een onuitsprekelijke waarheid. De synthese onthult dat de rituele taal een scheppend instrument is dat een symbolische wereld construeert, betekenis toekent en de deelnemers in een nieuw verhaal plaatst."
    },
    {
        title: "De Belichaamde Kennis",
        description: "Focust op hoe kennis en transformatie niet alleen intellectueel, maar vooral fysiek worden ervaren en in het lichaam worden opgeslagen.",
        ritualText: "De kandidaat leert de passen te zetten, de tekens te maken. Zijn lichaam wordt een instrument. De ruwe steen voelt hij onder zijn handen, de beitel trilt in zijn greep. De kennis wordt niet gelezen in een boek, maar ingeslepen in spier en zenuw, een geheugen dat dieper ligt dan het denken.",
        lenses: [
            { lensCode: 'CON_FE', ...LENSES_DATA[6].subCodes.find(sc => sc.code === 'LICH')! },
            { lensCode: 'CON_MB', ...LENSES_DATA[15].subCodes.find(sc => sc.code === 'EMB')! },
            { lensCode: 'CON_AG', ...LENSES_DATA[7].subCodes.find(sc => sc.code === 'DID')! },
            { lensCode: 'CON_MB', ...LENSES_DATA[15].subCodes.find(sc => sc.code === 'AGEN')! }
        ],
        synthesisText: "Het ritueel onderwijst door het lichaam. De centrale **didactische methode** (CON_AG/DID) is niet overdracht van informatie, maar het creëren van ervaringen. De focus op **lichamelijkheid** (CON_FE/LICH) – specifieke houdingen, passen en gebaren – zorgt ervoor dat de lessen fysiek worden verankerd. Dit leidt tot **embodied knowledge** (CON_MB/EMB), een vorm van weten die in het lichaam is opgeslagen en vaak aan het louter intellectuele begrip voorafgaat. In dit proces zijn de objecten geen passieve hulpmiddelen; de 'agency van objecten' (CON_MB/AGEN) speelt een cruciale rol. De weerstand van de steen en de scherpte van de beitel zijn actieve 'leermeesters' die het lichaam van de kandidaat vormen. De synthese toont aan dat de transformatie een diep fysiek proces is, waarbij het lichaam het primaire medium is voor het ontvangen, opslaan en uitdrukken van maçonnieke kennis."
    },
    {
        title: "De Overgang (Rite de Passage)",
        description: "Gebruikt het klassieke antropologische model van Arnold van Gennep om de fasen van initiatie te analyseren als een universeel menselijk proces.",
        // FIX: Removed duplicate `ritualText` property.
        ritualText: "Hij laat zijn oude kleding en status achter (separatie). In het halfduister, zonder naam of rang, doorloopt hij de beproevingen (transitie). Uiteindelijk wordt hij bekleed met het schootsvel, ontvangt hij een nieuw licht en wordt hij als Broeder in de keten opgenomen (incorporatie). Hij is niet meer wie hij was.",
        lenses: [
            { lensCode: 'CON_AN', ...LENSES_DATA[9].subCodes.find(sc => sc.code === 'RDP')! },
            { lensCode: 'CON_TR', ...LENSES_DATA[8].subCodes.find(sc => sc.code === 'LIM')! },
            { lensCode: 'CON_PS', ...LENSES_DATA[1].subCodes.find(sc => sc.code === 'PER')! },
            { lensCode: 'CON_TR', ...LENSES_DATA[8].subCodes.find(sc => sc.code === 'INT')! }
        ],
        synthesisText: "De maçonnieke inwijding is een schoolvoorbeeld van een **Rite de Passage** (CON_AN/RDP). De eerste fase, separatie, wordt gemarkeerd door het afleggen van de metalen, een daad die het afstropen van de sociale **Persona** (CON_PS/PER) symboliseert. Wat volgt is de cruciale transitiefase, een periode van intense **liminaliteit** (CON_TR/LIM). De kandidaat is 'betwixt and between', niet langer een profaan, maar nog geen ingewijde. Deze ongedefinieerde staat is essentieel voor transformatie. De laatste fase is de incorporatie, die hier wordt geanalyseerd als **integratie** (CON_TR/INT). Het ontvangen van het schootsvel en het licht zijn symbolische handelingen die de kandidaat in zijn nieuwe status bevestigen en hem opnieuw in de sociale structuur van de gemeenschap plaatsen. De synthese van deze lenzen toont hoe het ritueel een universeel menselijk patroon volgt om een diepgaande en sociaal erkende identiteitsverandering te bewerkstelligen."
    },
    {
        title: "De Mystieke Eenwording",
        description: "Analyseert de symboliek die wijst op het overstijgen van het ego en de eenwording met een hoger, transcendent principe.",
        ritualText: "In de diepste stilte, wanneer alle lichten zijn gedoofd behalve dat Ene, ervaart de ingewijde een moment van ontzag. De grenzen van het zelf vervagen. Hij voelt zich deel van een oneindig groter geheel, een ster in de kosmische bouw. Dit is het einddoel: niet het weten, maar het zijn.",
        lenses: [
            { lensCode: 'CON_ANA', ...LENSES_DATA[17].subCodes.find(sc => sc.code === 'UNIO')! },
            { lensCode: 'CON_E', ...LENSES_DATA[10].subCodes.find(sc => sc.code === 'SUB')! },
            { lensCode: 'CON_PS', ...LENSES_DATA[1].subCodes.find(sc => sc.code === 'SEL')! },
            { lensCode: 'CON_ANA', ...LENSES_DATA[17].subCodes.find(sc => sc.code === 'ESCA')! }
        ],
        synthesisText: "De kern van de maçonnieke mystiek is de zoektocht naar **Unio Mystica** (CON_ANA/UNIO), de eenwording met het Al. Het ritueel creëert de voorwaarden voor een dergelijke ervaring door een sfeer van **het Sublieme** (CON_E/SUB) op te roepen: een gevoel van ontzag en overweldiging dat de kleinheid van het ego benadrukt. Dit moment van zelf-transcendentie is het **eschatologische perspectief** (CON_ANA/ESCA) van het ritueel: het ultieme doel waar de hele symbolische reis naartoe leidt. In psychologische termen kan deze ervaring worden begrepen als een diep contact met **het Zelf** (CON_PS/SEL), het archetype van heelheid dat het beperkte ego overstijgt. De synthese van deze lenzen beschrijft het hoogtepunt van het ritueel als een esthetisch en psychologisch proces dat is ontworpen om de ingewijde een glimp te laten opvangen van een non-duale, verenigde staat van bewustzijn."
    }
];