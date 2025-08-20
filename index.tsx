import './style.css';
import { GoogleGenAI } from "@google/genai";

// --- DATA STRUCTURES --- //
interface LensPrompt {
    question: string;
}

interface LensSubCode {
    code: string;
    name: string;
    type: string;
    prompts: LensPrompt[];
}

interface ConceptualLens {
    code: string;
    name: string;
    description: string;
    subCodes: LensSubCode[];
}

// --- DATA FROM PDF --- //
const LENSES_DATA: ConceptualLens[] = [
    {
        code: 'CON_TA',
        name: 'Talige Conceptie',
        description: 'Deze lens onderzoekt hoe taal, woordgebruik en structuur betekenis geven aan het ritueel. Het richt zich op semantiek, retoriek, narratief en symbolisch taalgebruik.',
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
        subCodes: [
            { code: 'HAR', name: 'Harmonie & Compositie', type: 'Analyse van de balans en samenhang van de verschillende rituele elementen.', prompts: [{ question: "Hoe creëren de symmetrie van de tempelopstelling en de choreografie van de bewegingen een gevoel van orde en harmonie?" }, { question: "Op welke manier vloeien woord, gebaar, en muziek samen tot een esthetisch geheel?" }] },
            { code: 'SUB', name: 'Het Sublieme', type: 'Analyse van ervaringen die ontzag, grootsheid en overweldiging oproepen.', prompts: [{ question: "Welke elementen in het ritueel (bv. stilte, duisternis, plechtige taal) roepen een gevoel van het sublieme op?" }, { question: "Hoe wordt de nietigheid van het individu ten opzichte van het 'Grote Andere' esthetisch ervaren?" }] }
        ]
    },
    {
        code: 'CON_ETH',
        name: 'Ethische Conceptie',
        description: 'Deze lens analyseert het ritueel als een vehikel voor de overdracht en inoefening van een specifiek ethisch kader of waardensysteem.',
        subCodes: [
            { code: 'DEUGD', name: 'Deugdethiek', type: 'Analyse van de centrale deugden die worden voorgesteld en ingeoefend.', prompts: [{ question: "Welke maçonnieke deugden (bv. verdraagzaamheid, broederliefde, standvastigheid) worden expliciet of impliciet onderwezen?" }, { question: "Hoe wordt de kandidaat aangespoord om een deugdzaam karakter te ontwikkelen?" }] },
            { code: 'WAAR', name: 'Waarden & Normen', type: 'Analyse van de onderliggende waarden die het handelen van de vrijmetselaar moeten sturen.', prompts: [{ question: "Welke waarden worden in het ritueel als fundamenteel gepresenteerd?" }, { question: "Hoe worden deze waarden vertaald naar concrete gedragsnormen binnen en buiten de loge?" }] },
            { code: 'MOR', name: 'Moreel Dilemma', type: 'Analyse van situaties die de kandidaat voor een morele keuze of beproeving plaatsen.', prompts: [{ question: "Wordt de kandidaat in het ritueel geconfronteerd met symbolische morele dilemma's?" }, { question: "Hoe test het ritueel de morele integriteit en betrouwbaarheid van de kandidaat?" }] }
        ]
    }
];

type AppView = 'analyse' | 'synthese' | 'explorer';
type SynthesisSlot = (LensSubCode & { lensCode: string }) | null;


class RituaLensApp {
    private ai: GoogleGenAI;

    // --- Element properties ---
    private navAnalyse: HTMLElement;
    private navSynthese: HTMLElement;
    private navExplorer: HTMLElement;
    
    private analysisView: HTMLElement;
    private synthesisView: HTMLElement;
    private lensExplorerView: HTMLElement;

    private lensListContainer: HTMLElement;
    private interpretationContentContainer: HTMLElement;
    
    private synthesisLensLibrary: HTMLElement;
    private synthesisDropZonesContainer: HTMLElement;
    private synthesisGenerateBtn: HTMLButtonElement;
    private synthesisResultTextarea: HTMLTextAreaElement;
    

    // --- State ---
    private state: {
        selectedLensCode: string | null;
        selectedSubCode: string | null;
        activeView: AppView;
        isDetailedAnalysis: boolean;
        synthesisSlots: SynthesisSlot[];
    };

    constructor() {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        this.state = {
            selectedLensCode: null,
            selectedSubCode: null,
            activeView: 'analyse',
            isDetailedAnalysis: true,
            synthesisSlots: [null, null, null, null],
        };

        // --- Element Caching ---
        this.navAnalyse = document.getElementById('nav-analyse')!;
        this.navSynthese = document.getElementById('nav-synthese')!;
        this.navExplorer = document.getElementById('nav-explorer')!;

        this.analysisView = document.getElementById('main-content')!;
        this.synthesisView = document.getElementById('synthesis-view')!;
        this.lensExplorerView = document.getElementById('lens-explorer-view')!;

        this.lensListContainer = document.getElementById('lens-list')!;
        this.interpretationContentContainer = document.getElementById('interpretation-content')!;
        
        this.synthesisLensLibrary = document.getElementById('synthesis-lens-library')!;
        this.synthesisDropZonesContainer = document.getElementById('synthesis-drop-zones')!;
        this.synthesisGenerateBtn = document.getElementById('synthesis-generate-btn') as HTMLButtonElement;
        this.synthesisResultTextarea = document.getElementById('synthesis-result-textarea') as HTMLTextAreaElement;
    }

    public init() {
        this.setupNavigation();
        
        // Setup that only needs to run once
        this.synthesisGenerateBtn.addEventListener('click', () => this.handleSynthesis());
        this.renderSynthesisLensLibrary();
        this.renderLensExplorer();

        // Trigger the first render based on the initial state
        this.updateUI();
    }
    
    private setState(newState: Partial<typeof this.state>) {
        this.state = { ...this.state, ...newState };
        this.updateUI();
    }

    private updateUI() {
        const views = {
            analyse: this.analysisView,
            synthese: this.synthesisView,
            explorer: this.lensExplorerView,
        };

        Object.entries(views).forEach(([viewName, viewElement]) => {
            const isActive = this.state.activeView === viewName;
            if (isActive) {
                viewElement.classList.remove('hidden');
                setTimeout(() => viewElement.classList.remove('opacity-0'), 10);
            } else {
                viewElement.classList.add('opacity-0');
                setTimeout(() => viewElement.classList.add('hidden'), 500);
            }
        });

        // Handle nav item active state
        const navItems = [this.navAnalyse, this.navSynthese, this.navExplorer];
        navItems.forEach(item => {
            item.classList.remove('active-nav-link');
            item.classList.add('text-primary-400', 'hover:bg-primary-700', 'hover:text-accent-400');
        });
        if (this.state.activeView === 'analyse') {
            this.navAnalyse.classList.add('active-nav-link');
        } else if (this.state.activeView === 'synthese') {
            this.navSynthese.classList.add('active-nav-link');
        } else if (this.state.activeView === 'explorer') {
            this.navExplorer.classList.add('active-nav-link');
        }
        
        // Re-render dynamic content for the active view
        if (this.state.activeView === 'analyse') {
            this.renderLensSelectionPanel();
            this.renderInterpretationPanel();
        } else if (this.state.activeView === 'synthese') {
            this.renderSynthesisDropZones();
            this.updateSynthesisButtonState();
        }
    }

    private setupNavigation() {
        this.navAnalyse.addEventListener('click', (e) => { e.preventDefault(); this.setState({ activeView: 'analyse' }); });
        this.navSynthese.addEventListener('click', (e) => { e.preventDefault(); this.setState({ activeView: 'synthese' }); });
        this.navExplorer.addEventListener('click', (e) => { e.preventDefault(); this.setState({ activeView: 'explorer' }); });
    }

    // --- Analyse View Methods ---
    
    private renderLensSelectionPanel() {
        this.lensListContainer.innerHTML = '';
        LENSES_DATA.forEach(lens => {
            const lensGroup = document.createElement('div');
            lensGroup.className = 'mb-8';

            const title = document.createElement('div');
            title.className = 'flex justify-between items-center p-3 bg-primary-800 border border-primary-700 rounded-md text-primary-100 cursor-default';
            title.innerHTML = `<h3 class="font-serif text-xl font-semibold">${lens.code}</h3><span class="text-sm">${lens.name}</span>`;
            lensGroup.appendChild(title);

            const subCodeList = document.createElement('ul');
            subCodeList.className = 'list-none p-0 mt-2';
            
            lens.subCodes.forEach(subCode => {
                const listItem = document.createElement('li');
                listItem.textContent = `${subCode.code}: ${subCode.name}`;
                listItem.dataset.lensCode = lens.code;
                listItem.dataset.subCode = subCode.code;

                const baseClasses = 'py-2 px-4 rounded cursor-pointer text-primary-400 transition-all duration-200 border border-transparent transform hover:scale-105';
                const hoverClasses = 'hover:bg-accent-400/10 hover:text-primary-100';
                const activeClasses = 'bg-accent-400/10 text-accent-400 font-semibold border-accent-400';

                listItem.className = `${baseClasses} ${hoverClasses}`;
                if(this.state.selectedSubCode === subCode.code && this.state.selectedLensCode === lens.code) {
                    listItem.className = `${baseClasses} ${activeClasses}`;
                }

                listItem.addEventListener('click', () => {
                    this.setState({ selectedLensCode: lens.code, selectedSubCode: subCode.code });
                });
                subCodeList.appendChild(listItem);
            });
            lensGroup.appendChild(subCodeList);
            this.lensListContainer.appendChild(lensGroup);
        });
    }

    private async handleAnalysis() {
        const { selectedLensCode, selectedSubCode } = this.state;
        const ritualText = (document.getElementById('ritual-text-input') as HTMLTextAreaElement).value;
        const analysisButton = document.getElementById('ai-analysis-btn') as HTMLButtonElement;
        const resultTextarea = document.getElementById('interpretation-textarea') as HTMLTextAreaElement;

        if (!selectedLensCode || !selectedSubCode || !ritualText.trim()) {
            resultTextarea.value = "Voer eerst een rituele tekst in de linkerkolom in en selecteer een lens om een analyse te kunnen starten.";
            resultTextarea.classList.add('text-red-400');
            return;
        }

        const lens = LENSES_DATA.find(l => l.code === selectedLensCode);
        const subCode = lens?.subCodes.find(sc => sc.code === selectedSubCode);
        if (!subCode) return;

        analysisButton.disabled = true;
        analysisButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg><span>Analyseren...</span>`;
        resultTextarea.value = 'De AI-analyse wordt voorbereid en uitgevoerd. Een ogenblik geduld...';
        resultTextarea.classList.remove('text-red-400');

        const promptQuestions = subCode.prompts.map(p => `- ${p.question}`).join('\n');
        const analysisInstruction = this.state.isDetailedAnalysis 
            ? "Integreer de antwoorden in een vloeiende, inzichtelijke en goed gestructureerde tekst."
            : "Vat de kern van uw analyse samen in maximaal twee beknopte alinea's. Wees direct, beknopt en to-the-point.";
        const prompt = `U bent een expert in de maçonnieke exegese. Analyseer de volgende rituele tekst uitsluitend door de conceptuele lens van '${lens.name}', met een specifieke focus op het sub-concept '${subCode.name}: ${subCode.type}'. Gebruik de volgende kernvragen als leidraad voor uw analyse, maar beperk u er niet toe. ${analysisInstruction}\n\nKernvragen:\n${promptQuestions}\n\nAnalyseer nu de onderstaande rituele tekst en presenteer uw bevindingen.\n\n--- RITUELE TEKST ---\n${ritualText}\n--- EINDE TEKST ---`;

        try {
            const response = await this.ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            resultTextarea.value = response.text;
        } catch (error) {
            console.error("AI Analysis Error:", error);
            resultTextarea.value = `Er is een fout opgetreden bij de AI-analyse. Controleer uw API-sleutel en probeer het later opnieuw. Details: ${error instanceof Error ? error.message : String(error)}`;
            resultTextarea.classList.add('text-red-400');
        } finally {
            analysisButton.disabled = false;
            analysisButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg><span>Analyseer met AI</span>`;
        }
    }

    private renderInterpretationPanel() {
        const { selectedLensCode, selectedSubCode } = this.state;

        if (!selectedLensCode || !selectedSubCode) {
            this.interpretationContentContainer.innerHTML = `<div class="flex justify-center items-center h-full text-primary-500 text-center p-8">Selecteer een lens en subcode om de analyse te starten.</div>`;
            return;
        }

        const lens = LENSES_DATA.find(l => l.code === selectedLensCode);
        const subCode = lens?.subCodes.find(sc => sc.code === selectedSubCode);
        if (!subCode) return;

        const promptsHTML = subCode.prompts.map(p => `<li class="relative pl-6 mb-3 before:content-['•'] before:text-accent-400 before:absolute before:left-0 before:font-bold">${p.question}</li>`).join('');

        const toggleBaseClasses = "relative w-11 h-6 bg-primary-700 rounded-full cursor-pointer transition-colors duration-200 ease-in-out border border-primary-600";
        const toggleActiveClasses = "bg-accent-400 border-accent-400";
        const handleBaseClasses = "absolute top-0.5 left-0.5 w-5 h-5 bg-primary-300 rounded-full transition-transform duration-200 ease-in-out";
        const handleActiveClasses = "transform translate-x-5 bg-primary-900";

        this.interpretationContentContainer.innerHTML = `
            <div class="flex flex-col h-full p-2">
                <div class="mb-6">
                    <h3 class="font-serif text-accent-400 text-3xl font-semibold mb-2">${subCode.code}: ${subCode.name}</h3>
                    <p class="text-primary-400 italic mb-6">${subCode.type}</p>
                </div>
                <div class="mb-8"><ul class="list-none">${promptsHTML}</ul></div>
                <div class="border-t border-primary-700 pt-8 mb-8">
                    <div class="flex justify-between items-center gap-6">
                        <button id="ai-analysis-btn" class="w-full bg-accent-400 text-primary-900 rounded py-4 px-8 text-base font-semibold inline-flex items-center justify-center gap-3 transition-all duration-200 ease-in-out hover:bg-accent-300 disabled:bg-primary-700 disabled:text-primary-400 disabled:cursor-not-allowed disabled:opacity-60 transform hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                            <span>Analyseer met AI</span>
                        </button>
                        <div class="flex items-center gap-3 flex-shrink-0">
                            <label id="detail-toggle-label" for="detail-toggle-switch" class="text-primary-400 text-sm font-medium cursor-pointer select-none">Gedetailleerd</label>
                            <div id="detail-toggle-switch" class="${toggleBaseClasses} ${this.state.isDetailedAnalysis ? toggleActiveClasses : ''}" role="switch" aria-checked="${this.state.isDetailedAnalysis}" tabindex="0">
                                <div class="${handleBaseClasses} ${this.state.isDetailedAnalysis ? handleActiveClasses : ''}"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-grow flex flex-col">
                    <label for="interpretation-textarea" class="block mb-2 text-primary-100 font-medium">AI Analyse & Persoonlijke Reflectie</label>
                    <textarea id="interpretation-textarea" placeholder="Noteer hier uw gedachten en inzichten, of klik hierboven om een AI-analyse te starten..." class="w-full min-h-[200px] flex-grow bg-primary-800 border border-primary-700 rounded p-4 text-primary-300 font-sans text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-accent-400"></textarea>
                </div>
            </div>`;

        document.getElementById('ai-analysis-btn')?.addEventListener('click', () => this.handleAnalysis());
        const toggleSwitch = document.getElementById('detail-toggle-switch');
        const toggleLabel = document.getElementById('detail-toggle-label');
        const toggleHandler = () => { this.setState({ isDetailedAnalysis: !this.state.isDetailedAnalysis }); };
        toggleSwitch?.addEventListener('click', toggleHandler);
        toggleLabel?.addEventListener('click', toggleHandler);
        toggleSwitch?.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleHandler(); } });
    }
    
    // --- Synthesis View Methods ---
    
    private renderSynthesisLensLibrary() {
        this.synthesisLensLibrary.innerHTML = '';
        LENSES_DATA.forEach(lens => {
            const group = document.createElement('div');
            group.className = 'mb-4';
            group.innerHTML = `<div class="font-serif text-2xl font-semibold text-primary-100 mb-2">${lens.name}</div>`;

            const list = document.createElement('div');
            list.className = 'flex flex-col gap-2';
            lens.subCodes.forEach(subCode => {
                const item = document.createElement('div');
                item.className = 'bg-primary-800 border border-primary-700 rounded-md p-2 cursor-grab transition-all duration-200 hover:bg-primary-700 hover:text-primary-100 user-select-none transform hover:scale-105';
                item.draggable = true;
                item.dataset.lensCode = lens.code;
                item.dataset.subCode = subCode.code;
                item.innerHTML = `<span class="font-bold text-accent-400 mr-2">${subCode.code}</span><span class="text-primary-300">${subCode.name}</span>`;
                item.addEventListener('dragstart', this.handleDragStart.bind(this));
                item.addEventListener('dragend', this.handleDragEnd.bind(this));
                list.appendChild(item);
            });
            group.appendChild(list);
            this.synthesisLensLibrary.appendChild(group);
        });
    }

    private renderSynthesisDropZones() {
        this.synthesisDropZonesContainer.innerHTML = '';
        this.state.synthesisSlots.forEach((slot, index) => {
            const zone = document.createElement('div');
            zone.className = 'border-2 border-dashed border-primary-700 rounded-lg p-4 min-h-[140px] flex flex-col justify-center items-center text-center text-primary-500 transition-all duration-200 relative';
            zone.dataset.slotIndex = String(index);

            if (slot) {
                zone.classList.remove('border-dashed', 'border-primary-700', 'text-primary-500');
                zone.classList.add('border-solid', 'border-primary-600', 'bg-primary-800', 'items-start', 'text-left');
                zone.innerHTML = `
                    <button class="absolute top-2 right-2 text-primary-500 hover:text-red-400 text-xl leading-none p-1 rounded-full transition-colors">&times;</button>
                    <div class="text-accent-400 font-bold">${slot.lensCode} / ${slot.code}</div>
                    <div class="text-primary-100">${slot.name}</div>
                    <p class="text-sm text-primary-400 italic mt-1">${slot.type}</p>
                `;
                zone.querySelector('button')?.addEventListener('click', () => this.handleClearSlot(index));
            } else {
                zone.innerHTML = `<span class="italic">Sleep lens ${index + 1} hier</span>`;
            }
            
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));

            this.synthesisDropZonesContainer.appendChild(zone);
        });
    }

    private handleDragStart(e: DragEvent) {
        const target = e.target as HTMLElement;
        target.classList.add('opacity-50', 'border-dashed');
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', JSON.stringify({
                lensCode: target.dataset.lensCode,
                subCode: target.dataset.subCode,
            }));
        }
    }

    private handleDragEnd(e: DragEvent) {
        (e.target as HTMLElement).classList.remove('opacity-50', 'border-dashed');
    }

    private handleDragOver(e: DragEvent) {
        e.preventDefault();
        const target = (e.currentTarget as HTMLElement);
        if(!target.innerHTML.includes('button')) {
            target.classList.add('border-accent-400', 'bg-accent-400/10');
        }
    }

    private handleDragLeave(e: DragEvent) {
        const target = (e.currentTarget as HTMLElement);
        target.classList.remove('border-accent-400', 'bg-accent-400/10');
    }
    
    private handleDrop(e: DragEvent) {
        e.preventDefault();
        const target = (e.currentTarget as HTMLElement);
        target.classList.remove('border-accent-400', 'bg-accent-400/10');

        const slotIndex = parseInt(target.dataset.slotIndex!, 10);
        const data = JSON.parse(e.dataTransfer!.getData('text/plain'));
        const lens = LENSES_DATA.find(l => l.code === data.lensCode);
        const subCode = lens?.subCodes.find(sc => sc.code === data.subCode);

        if (subCode) {
            const newSlots = [...this.state.synthesisSlots];
            newSlots[slotIndex] = { ...subCode, lensCode: lens!.code };
            this.setState({ synthesisSlots: newSlots });
        }
    }

    private handleClearSlot(index: number) {
        const newSlots = [...this.state.synthesisSlots];
        newSlots[index] = null;
        this.setState({ synthesisSlots: newSlots });
    }

    private updateSynthesisButtonState() {
        const ritualText = (document.getElementById('synthesis-ritual-text-input') as HTMLTextAreaElement).value;
        const allSlotsFilled = this.state.synthesisSlots.every(slot => slot !== null);
        this.synthesisGenerateBtn.disabled = !allSlotsFilled || !ritualText.trim();
    }

    private async handleSynthesis() {
        this.updateSynthesisButtonState();
        if(this.synthesisGenerateBtn.disabled) return;

        this.synthesisGenerateBtn.disabled = true;
        this.synthesisGenerateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg><span>Synthese genereren...</span>`;
        this.synthesisResultTextarea.value = "De AI bereidt een gelaagde synthese voor op basis van de vier gekozen lenzen. Dit kan even duren...";
        this.synthesisResultTextarea.classList.remove('text-red-400');

        const ritualText = (document.getElementById('synthesis-ritual-text-input') as HTMLTextAreaElement).value;
        const lensDescriptions = this.state.synthesisSlots.map((slot, index) => 
            `${index + 1}. **${slot!.name} (${slot!.lensCode}/${slot!.code})**: ${slot!.type}`
        ).join('\n');

        const prompt = `U bent een meester-exegeet gespecialiseerd in gelaagde symbolische analyse. Uw taak is om de volgende rituele tekst te analyseren en een geïntegreerde synthese te schrijven. Beschouw de tekst NIET vanuit vier losse perspectieven, maar weef de inzichten van de volgende vier conceptuele lenzen samen tot één coherent, gelaagd betoog. Focus op de interacties, spanningen en synergieën tussen de lenzen om tot een dieper, eengemaakt inzicht te komen. De gekozen lenzen zijn:\n${lensDescriptions}\n\nPresenteer uw analyse als één vloeiende, inzichtelijke synthese.\n\n--- RITUELE TEKST ---\n${ritualText}\n--- EINDE TEKST ---`;

        try {
            const response = await this.ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            this.synthesisResultTextarea.value = response.text;
        } catch (error) {
            console.error("AI Synthesis Error:", error);
            this.synthesisResultTextarea.value = `Er is een fout opgetreden bij de AI-synthese. Controleer uw API-sleutel en probeer het later opnieuw. Details: ${error instanceof Error ? error.message : String(error)}`;
            this.synthesisResultTextarea.classList.add('text-red-400');
        } finally {
            this.updateSynthesisButtonState();
            this.synthesisGenerateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg><span>Genereer Synthese</span>`;
        }
    }


    // --- Lens Explorer View Methods ---

    private renderLensExplorer() {
        const fragment = document.createDocumentFragment();

        LENSES_DATA.forEach(lens => {
            const lensSection = this.createExplorerSection(`${lens.name} (${lens.code})`, lens.description);
            const lensGrid = lensSection.querySelector('.explorer-grid')!;
            if (lens.subCodes.length > 0) {
                lens.subCodes.forEach(subCode => {
                    lensGrid.appendChild(this.createExplorerCard(subCode));
                });
            } else {
                lensGrid.innerHTML = '<p class="text-primary-500">Deze lens is nog niet in detail uitgewerkt.</p>';
            }
            fragment.appendChild(lensSection);
        });

        this.lensExplorerView.innerHTML = '';
        this.lensExplorerView.appendChild(fragment);
    }

    private createExplorerSection(title: string, description: string): HTMLElement {
        const section = document.createElement('section');
        section.className = 'mb-12';
        section.innerHTML = `
            <h2 class="font-serif text-5xl font-bold text-primary-100 mb-2 pb-2 border-b border-primary-700">${title}</h2>
            <p class="text-lg text-primary-400 mb-8 max-w-3xl">${description}</p>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6"></div>
        `;
        return section;
    }

    private createExplorerCard(item: LensSubCode): HTMLElement {
        const card = document.createElement('div');
        card.className = 'bg-primary-800 border border-primary-700 rounded-lg flex flex-col transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:border-accent-400';
        
        const promptsHTML = `
            <h4 class="font-semibold text-primary-300 mb-2 text-sm uppercase tracking-wider">Analyse-prompt / Kernvragen</h4>
            <div class="text-primary-400 text-sm">
                <ul class="list-none">${item.prompts.map(p => `<li class="relative pl-5 mb-2 before:content-['›'] before:text-accent-400 before:absolute before:left-0">${p.question}</li>`).join('')}</ul>
            </div>
        `;

        card.innerHTML = `
            <div class="p-4 border-b border-primary-700">
                <div class="font-mono font-bold text-accent-400 text-2xl font-semibold">${item.code}</div>
                <div class="text-primary-100 text-lg">${item.name}</div>
            </div>
            <div class="p-4 flex-grow">
                <h4 class="font-semibold text-primary-300 mb-2 text-sm uppercase tracking-wider">Type / Functie</h4>
                <p class="text-primary-400 text-sm mb-4">${item.type}</p>
                ${promptsHTML}
            </div>
        `;
        return card;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = new RituaLensApp();
        app.init();
    } catch (e) {
        document.body.innerHTML = `<div class="error-container">
            <h1>Initialisatie Fout</h1>
            <p>Er is een kritieke fout opgetreden bij het opstarten van de applicatie.</p>
            <pre>${e instanceof Error ? e.message : String(e)}</pre>
            <p>Zorg ervoor dat de <code>API_KEY</code> correct is ingesteld in de omgeving.</p>
        </div>`;
    }
});