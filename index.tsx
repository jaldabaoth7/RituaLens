import './index.css';
import { GoogleGenAI } from "@google/genai";
import { LENSES_DATA, LENS_CATEGORIES, LensSubCode, SYNTHESIS_EXAMPLES, SynthesisSlot, SynthesisExample } from './lenses';


const GENERAL_ANALYSIS_CODE = '__GENERAL__';
type AppView = 'analyse' | 'synthese' | 'explorer';


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
    private synthesisExamplesContainer: HTMLElement;
    private synthesisGenerateBtn: HTMLButtonElement;
    private synthesisClearAllBtn: HTMLButtonElement;
    private synthesisResultTextarea: HTMLTextAreaElement;
    private synthesisRitualTextInput: HTMLTextAreaElement;
    
    private helpBtn: HTMLButtonElement;
    private helpModal: HTMLElement;
    private helpModalCloseBtn: HTMLButtonElement;

    private synthesisResultModal: HTMLElement;
    private synthesisResultCloseBtn: HTMLButtonElement;
    private synthesisResultModalTextarea: HTMLTextAreaElement;
    private synthesisResultCopyBtn: HTMLButtonElement;
    private synthesisResultSaveBtn: HTMLButtonElement;
    private synthesisResultLoader: HTMLElement;

    private tooltipElement: HTMLElement | null = null;

    // --- State ---
    private state: {
        selectedLensCode: string | null;
        selectedSubCode: string | null;
        activeView: AppView;
        isDetailedAnalysis: boolean;
        synthesisSlots: SynthesisSlot[];
        expandedCategoryCode: string | null;
        expandedLensCode: string | null;
        isHelpModalOpen: boolean;
        isSynthesisResultModalOpen: boolean;
        synthesisResultText: string;
        isSynthesizing: boolean;
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
            expandedCategoryCode: null,
            expandedLensCode: null,
            isHelpModalOpen: false,
            isSynthesisResultModalOpen: false,
            synthesisResultText: '',
            isSynthesizing: false,
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
        this.synthesisExamplesContainer = document.getElementById('synthesis-examples-container')!;
        this.synthesisGenerateBtn = document.getElementById('synthesis-generate-btn') as HTMLButtonElement;
        this.synthesisClearAllBtn = document.getElementById('synthesis-clear-all-btn') as HTMLButtonElement;
        this.synthesisResultTextarea = document.getElementById('synthesis-result-textarea') as HTMLTextAreaElement;
        this.synthesisRitualTextInput = document.getElementById('synthesis-ritual-text-input') as HTMLTextAreaElement;
        
        this.helpBtn = document.getElementById('help-btn') as HTMLButtonElement;
        this.helpModal = document.getElementById('help-modal')!;
        this.helpModalCloseBtn = document.getElementById('help-modal-close-btn') as HTMLButtonElement;
        
        this.synthesisResultModal = document.getElementById('synthesis-result-modal')!;
        this.synthesisResultCloseBtn = document.getElementById('synthesis-result-close-btn') as HTMLButtonElement;
        this.synthesisResultModalTextarea = document.getElementById('synthesis-result-modal-textarea') as HTMLTextAreaElement;
        this.synthesisResultCopyBtn = document.getElementById('synthesis-result-copy-btn') as HTMLButtonElement;
        this.synthesisResultSaveBtn = document.getElementById('synthesis-result-save-btn') as HTMLButtonElement;
        this.synthesisResultLoader = document.getElementById('synthesis-result-loader')!;
    }

    public init() {
        this.setupNavigation();
        
        this.synthesisGenerateBtn.addEventListener('click', () => this.handleSynthesis());
        this.synthesisClearAllBtn.addEventListener('click', () => this.handleClearAllSlots());
        this.synthesisRitualTextInput.addEventListener('input', () => this.updateSynthesisButtonState());
        
        this.helpBtn.addEventListener('click', () => this.setState({ isHelpModalOpen: true }));
        this.helpModalCloseBtn.addEventListener('click', () => this.setState({ isHelpModalOpen: false }));
        this.helpModal.addEventListener('click', (e) => {
            if (e.target === this.helpModal) {
                 this.setState({ isHelpModalOpen: false });
            }
        });

        this.synthesisResultCloseBtn.addEventListener('click', () => this.setState({ isSynthesisResultModalOpen: false }));
        this.synthesisResultModal.addEventListener('click', (e) => {
            if (e.target === this.synthesisResultModal) {
                 this.setState({ isSynthesisResultModalOpen: false });
            }
        });
        this.synthesisResultCopyBtn.addEventListener('click', () => this.handleCopySynthesisResult());
        this.synthesisResultSaveBtn.addEventListener('click', () => this.handleSaveSynthesisResult());

        this.createTooltip();
        this.renderLensExplorer();
        this.renderSynthesisExamples();

        this.updateUI();
    }

    private createTooltip() {
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = 'lens-tooltip';
        document.body.appendChild(this.tooltipElement);
    }
    
    private showTooltip(content: string, event: MouseEvent) {
        if (!this.tooltipElement) return;
        this.tooltipElement.classList.remove('visible');
        this.tooltipElement.innerHTML = content;
        
        const tooltipWidth = this.tooltipElement.offsetWidth;
        const tooltipHeight = this.tooltipElement.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let finalX = event.pageX + 15;
        let finalY = event.pageY + 15;

        if (finalX + tooltipWidth > viewportWidth - 10) {
            finalX = event.pageX - tooltipWidth - 15;
        }
        if (finalY + tooltipHeight > viewportHeight - 10) {
            finalY = event.pageY - tooltipHeight - 15;
        }
        
        if (finalX < 10) finalX = 10;
        if (finalY < 10) finalY = 10;
        
        this.tooltipElement.style.left = `${finalX}px`;
        this.tooltipElement.style.top = `${finalY}px`;
        
        this.tooltipElement.classList.add('visible');
    }

    private hideTooltip() {
        if (!this.tooltipElement) return;
        this.tooltipElement.classList.remove('visible');
    }
    
    private setState(newState: Partial<typeof this.state>) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };
        this.updateUI(oldState);
    }

    private updateUI(oldState?: typeof this.state) {
        // Handle view visibility
        this.analysisView.classList.toggle('hidden', this.state.activeView !== 'analyse');
        this.synthesisView.classList.toggle('hidden', this.state.activeView !== 'synthese');
        this.lensExplorerView.classList.toggle('hidden', this.state.activeView !== 'explorer');

        // Handle nav item active state
        this.navAnalyse.classList.toggle('active', this.state.activeView === 'analyse');
        this.navSynthese.classList.toggle('active', this.state.activeView === 'synthese');
        this.navExplorer.classList.toggle('active', this.state.activeView === 'explorer');
        
        // Handle modal visibility
        this.helpModal.classList.toggle('hidden', !this.state.isHelpModalOpen);
        this.synthesisResultModal.classList.toggle('hidden', !this.state.isSynthesisResultModalOpen);

        // Handle synthesis result modal content
        if (this.state.isSynthesisResultModalOpen) {
            this.synthesisResultLoader.classList.toggle('hidden', !this.state.isSynthesizing);
            this.synthesisResultModalTextarea.classList.toggle('hidden', this.state.isSynthesizing);
            if (!this.state.isSynthesizing) {
                this.synthesisResultModalTextarea.value = this.state.synthesisResultText;
            }
        }

        // Re-render dynamic content for the active view
        if (this.state.activeView === 'analyse') {
            // Avoid re-rendering on every minor state change for performance
            if (this.state.activeView !== oldState?.activeView || this.state.expandedCategoryCode !== oldState?.expandedCategoryCode || this.state.expandedLensCode !== oldState?.expandedLensCode) {
                this.renderLensSelectionPanel();
            }
            this.renderInterpretationPanel(); // This one depends on selection, so it always re-renders on state change
        } else if (this.state.activeView === 'synthese') {
            if(this.state.activeView !== oldState?.activeView || this.state.expandedCategoryCode !== oldState?.expandedCategoryCode || this.state.expandedLensCode !== oldState?.expandedLensCode) {
                this.renderSynthesisLensLibrary();
            }
            this.renderSynthesisDropZones();
            this.updateSynthesisButtonState();
        }
    }

    private setupNavigation() {
        this.navAnalyse.addEventListener('click', (e) => { e.preventDefault(); this.setState({ activeView: 'analyse', expandedCategoryCode: null, expandedLensCode: null }); });
        this.navSynthese.addEventListener('click', (e) => { e.preventDefault(); this.setState({ activeView: 'synthese', expandedCategoryCode: null, expandedLensCode: null }); });
        this.navExplorer.addEventListener('click', (e) => { e.preventDefault(); this.setState({ activeView: 'explorer' }); });
    }

    // --- Analyse View Methods ---
    
    private renderLensSelectionPanel() {
        this.lensListContainer.innerHTML = '';
        LENS_CATEGORIES.forEach(category => {
            const isCategoryExpanded = this.state.expandedCategoryCode === category.code;
            
            const categoryGroup = document.createElement('div');
            categoryGroup.className = `category-group ${isCategoryExpanded ? 'expanded' : ''}`;
            
            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'category-title';
            categoryTitle.innerHTML = `<span class="category-icon">${category.icon}</span> <h3>${category.name}</h3> <span class="chevron">▸</span>`;
            categoryTitle.addEventListener('click', () => {
                this.setState({ expandedCategoryCode: isCategoryExpanded ? null : category.code });
            });
            categoryGroup.appendChild(categoryTitle);
            
            const categoryContent = document.createElement('div');
            categoryContent.className = 'category-content';

            const lensesForCategory = LENSES_DATA.filter(lens => lens.categories.includes(category.code));
            
            lensesForCategory.forEach(lens => {
                const isExpanded = this.state.expandedLensCode === lens.code;
                const lensGroup = document.createElement('div');
                lensGroup.className = `lens-group ${isExpanded ? 'expanded' : ''}`;

                const title = document.createElement('div');
                title.className = 'lens-title';
                title.innerHTML = `<h4>${lens.name}</h4> <span class="chevron">▸</span>`;
                title.addEventListener('click', () => {
                    this.setState({ expandedLensCode: isExpanded ? null : lens.code });
                });
                title.addEventListener('mouseenter', (e) => this.showTooltip(lens.description, e));
                title.addEventListener('mouseleave', () => this.hideTooltip());
                lensGroup.appendChild(title);

                const subItemsContainer = document.createElement('div');
                subItemsContainer.className = 'lens-sub-items-container';

                const subCodeList = document.createElement('ul');
                subCodeList.className = 'subcode-list';

                const generalItem = document.createElement('li');
                generalItem.textContent = `Algemene Analyse: ${lens.name}`;
                generalItem.className = 'general-analysis';
                generalItem.dataset.lensCode = lens.code;
                generalItem.dataset.subCode = GENERAL_ANALYSIS_CODE;
                if (this.state.selectedSubCode === GENERAL_ANALYSIS_CODE && this.state.selectedLensCode === lens.code) {
                    generalItem.classList.add('active');
                }
                generalItem.addEventListener('click', () => {
                    this.setState({ selectedLensCode: lens.code, selectedSubCode: GENERAL_ANALYSIS_CODE });
                });
                generalItem.addEventListener('mouseenter', (e) => this.showTooltip(lens.description, e));
                generalItem.addEventListener('mouseleave', () => this.hideTooltip());
                subCodeList.appendChild(generalItem);
                
                lens.subCodes.forEach(subCode => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${subCode.code}: ${subCode.name}`;
                    listItem.dataset.lensCode = lens.code;
                    listItem.dataset.subCode = subCode.code;
                    if(this.state.selectedSubCode === subCode.code && this.state.selectedLensCode === lens.code) {
                        listItem.classList.add('active');
                    }
                    listItem.addEventListener('click', () => {
                        this.setState({ selectedLensCode: lens.code, selectedSubCode: subCode.code });
                    });
                    listItem.addEventListener('mouseenter', (e) => this.showTooltip(subCode.type, e));
                    listItem.addEventListener('mouseleave', () => this.hideTooltip());
                    subCodeList.appendChild(listItem);
                });
                subItemsContainer.appendChild(subCodeList);
                lensGroup.appendChild(subItemsContainer);
                categoryContent.appendChild(lensGroup);
            });

            categoryGroup.appendChild(categoryContent);
            this.lensListContainer.appendChild(categoryGroup);
        });
    }

    private async handleAnalysis() {
        const { selectedLensCode, selectedSubCode } = this.state;
        const ritualText = (document.getElementById('ritual-text-input') as HTMLTextAreaElement).value;
        const analysisButton = document.getElementById('ai-analysis-btn') as HTMLButtonElement;
        const resultTextarea = document.getElementById('interpretation-textarea') as HTMLTextAreaElement;

        if (!selectedLensCode || !selectedSubCode || !ritualText.trim()) {
            resultTextarea.value = "Voer eerst een rituele tekst in de linkerkolom in en selecteer een lens om een analyse te kunnen starten.";
            resultTextarea.classList.add('error');
            return;
        }

        const lens = LENSES_DATA.find(l => l.code === selectedLensCode);
        if (!lens) return;

        analysisButton.disabled = true;
        analysisButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg><span>Analyseren...</span>`;
        resultTextarea.value = 'De AI-analyse wordt voorbereid en uitgevoerd. Een ogenblik geduld...';
        resultTextarea.classList.remove('error');
        
        const analysisInstruction = this.state.isDetailedAnalysis 
            ? "Integreer de antwoorden in een vloeiende, inzichtelijke en goed gestructureerde tekst."
            : "Vat de kern van uw analyse samen in maximaal twee beknopte alinea's. Wees direct, beknopt en to-the-point.";

        let prompt = '';
        if (selectedSubCode === GENERAL_ANALYSIS_CODE) {
             const subThemes = lens.subCodes.map(sc => sc.name).join(', ');
             prompt = `U bent een expert in de maçonnieke exegese. Analyseer de volgende rituele tekst uitsluitend door de algemene conceptuele lens van '${lens.name}'. Deze lens omvat de volgende kernthema's: ${subThemes}. Beschouw hoe deze thema's gezamenlijk betekenis geven aan de tekst. ${analysisInstruction}\n\nAnalyseer nu de onderstaande rituele tekst en presenteer uw bevindingen.\n\n--- RITUELE TEKST ---\n${ritualText}\n--- EINDE TEKST ---`;
        } else {
            const subCode = lens.subCodes.find(sc => sc.code === selectedSubCode);
            if (!subCode) return;
            const promptQuestions = subCode.prompts.map(p => `- ${p.question}`).join('\n');
            prompt = `U bent een expert in de maçonnieke exegese. Analyseer de volgende rituele tekst uitsluitend door de conceptuele lens van '${lens.name}', met een specifieke focus op het sub-concept '${subCode.name}: ${subCode.type}'. Gebruik de volgende kernvragen als leidraad voor uw analyse, maar beperk u er niet toe. ${analysisInstruction}\n\nKernvragen:\n${promptQuestions}\n\nAnalyseer nu de onderstaande rituele tekst en presenteer uw bevindingen.\n\n--- RITUELE TEKST ---\n${ritualText}\n--- EINDE TEKST ---`;
        }


        try {
            const response = await this.ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            resultTextarea.value = response.text;
        } catch (error) {
            console.error("AI Analysis Error:", error);
            resultTextarea.value = `Er is een fout opgetreden bij de AI-analyse. Controleer uw API-sleutel en probeer het later opnieuw. Details: ${error instanceof Error ? error.message : String(error)}`;
            resultTextarea.classList.add('error');
        } finally {
            analysisButton.disabled = false;
            analysisButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg><span>Analyseer met AI</span>`;
        }
    }

    private renderInterpretationPanel() {
        const { selectedLensCode, selectedSubCode } = this.state;

        if (!selectedLensCode || !selectedSubCode) {
            this.interpretationContentContainer.innerHTML = `<div class="placeholder">Selecteer een lens om de analyse te starten.</div>`;
            return;
        }

        const lens = LENSES_DATA.find(l => l.code === selectedLensCode);
        if (!lens) return;
        
        let subCode: LensSubCode;
        let promptsHTML: string;
        
        if (selectedSubCode === GENERAL_ANALYSIS_CODE) {
            subCode = {
                code: lens.code,
                name: `Algemene Analyse: ${lens.name}`,
                type: lens.description,
                prompts: lens.subCodes.map(sc => ({ question: `Overweeg het thema: <strong>${sc.name}</strong>` }))
            };
            promptsHTML = `<li>De analyse zal de tekst benaderen vanuit de overkoepelende thema's van de lens <strong>${lens.name}</strong>.</li>`;
        } else {
            const foundSubCode = lens.subCodes.find(sc => sc.code === selectedSubCode);
            if (!foundSubCode) return;
            subCode = foundSubCode;
            promptsHTML = subCode.prompts.map(p => `<li>${p.question}</li>`).join('');
        }
        
        this.interpretationContentContainer.innerHTML = `
            <div class="interpretation-header">
                <h3 class="subcode-title">${subCode.code}: ${subCode.name}</h3>
                <p class="subcode-type">${subCode.type}</p>
            </div>
            <div class="interpretation-prompts"><ul>${promptsHTML}</ul></div>
            <div class="interpretation-notes">
                <label for="interpretation-textarea">AI Analyse & Persoonlijke Reflectie</label>
                <textarea id="interpretation-textarea" placeholder="Noteer hier uw gedachten en inzichten, of klik hieronder om een AI-analyse te starten..."></textarea>
            </div>
            <div class="interpretation-ai-action">
                <div class="ai-controls">
                    <button id="ai-analysis-btn" class="ai-button">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                         <span>Analyseer met AI</span>
                    </button>
                    <div class="toggle-switch-container">
                        <label id="detail-toggle-label" for="detail-toggle-switch">Gedetailleerd</label>
                        <div id="detail-toggle-switch" class="toggle-switch ${this.state.isDetailedAnalysis ? 'active' : ''}" role="switch" aria-checked="${this.state.isDetailedAnalysis}" tabindex="0">
                            <div class="toggle-switch-handle"></div>
                        </div>
                    </div>
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
        const generalIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="general-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        
        LENS_CATEGORIES.forEach(category => {
            const isCategoryExpanded = this.state.expandedCategoryCode === category.code;
            
            const categoryGroup = document.createElement('div');
            categoryGroup.className = `category-group ${isCategoryExpanded ? 'expanded' : ''}`;
            
            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'category-title';
            categoryTitle.innerHTML = `<span class="category-icon">${category.icon}</span> <h3>${category.name}</h3> <span class="chevron">▸</span>`;
            categoryTitle.addEventListener('click', () => {
                this.setState({ expandedCategoryCode: isCategoryExpanded ? null : category.code });
            });
            categoryGroup.appendChild(categoryTitle);
            
            const categoryContent = document.createElement('div');
            categoryContent.className = 'category-content';
            
            const list = document.createElement('div');
            list.className = 'synthesis-lens-list';
            
            const lensesForCategory = LENSES_DATA.filter(lens => lens.categories.includes(category.code));

            lensesForCategory.forEach(lens => {
                const isExpanded = this.state.expandedLensCode === lens.code;
                const lensGroup = document.createElement('div');
                lensGroup.className = `lens-group ${isExpanded ? 'expanded' : ''}`;
                
                const title = document.createElement('div');
                title.className = 'lens-title';
                title.innerHTML = `<h4>${lens.name}</h4> <span class="chevron">▸</span>`;
                title.addEventListener('click', () => {
                    this.setState({ expandedLensCode: isExpanded ? null : lens.code });
                });
                title.addEventListener('mouseenter', (e: MouseEvent) => this.showTooltip(lens.description, e));
                title.addEventListener('mouseleave', () => this.hideTooltip());
                lensGroup.appendChild(title);
                
                const subItemsContainer = document.createElement('div');
                subItemsContainer.className = 'lens-sub-items-container';
                const subList = document.createElement('div');
                subList.className = 'synthesis-lens-sub-list';

                const generalItem = document.createElement('div');
                generalItem.className = 'synthesis-lens-item general-analysis';
                generalItem.draggable = true;
                generalItem.dataset.lensCode = lens.code;
                generalItem.dataset.subCode = GENERAL_ANALYSIS_CODE;
                generalItem.innerHTML = `${generalIconSVG}<span class="lens-item-name">Algemeen: ${lens.name}</span>`;
                generalItem.addEventListener('dragstart', this.handleDragStart.bind(this));
                generalItem.addEventListener('dragend', this.handleDragEnd.bind(this));
                generalItem.addEventListener('mouseenter', (e: MouseEvent) => this.showTooltip(lens.description, e));
                generalItem.addEventListener('mouseleave', () => this.hideTooltip());
                subList.appendChild(generalItem);

                lens.subCodes.forEach(subCode => {
                    const item = document.createElement('div');
                    item.className = 'synthesis-lens-item';
                    item.draggable = true;
                    item.dataset.lensCode = lens.code;
                    item.dataset.subCode = subCode.code;
                    item.innerHTML = `<span class="lens-item-code">${subCode.code}</span><span class="lens-item-name">${subCode.name}</span>`;
                    item.addEventListener('dragstart', this.handleDragStart.bind(this));
                    item.addEventListener('dragend', this.handleDragEnd.bind(this));
                    item.addEventListener('mouseenter', (e: MouseEvent) => this.showTooltip(subCode.type, e));
                    item.addEventListener('mouseleave', () => this.hideTooltip());
                    subList.appendChild(item);
                });
                
                subItemsContainer.appendChild(subList);
                lensGroup.appendChild(subItemsContainer);
                categoryContent.appendChild(lensGroup);
            });
            
            categoryGroup.appendChild(categoryContent);
            this.synthesisLensLibrary.appendChild(categoryGroup);
        });
    }

    private renderSynthesisDropZones() {
        this.synthesisDropZonesContainer.innerHTML = '';
        const generalIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="general-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

        this.state.synthesisSlots.forEach((slot, index) => {
            const zone = document.createElement('div');
            zone.className = 'drop-zone';
            zone.dataset.slotIndex = String(index);

            if (slot) {
                zone.classList.add('filled');
                if (slot.code === GENERAL_ANALYSIS_CODE) {
                    zone.classList.add('is-general');
                }
                
                const titleText = `${slot.lensCode} / ${slot.code === GENERAL_ANALYSIS_CODE ? 'Algemeen' : slot.code}`;
                const titleIcon = slot.code === GENERAL_ANALYSIS_CODE ? generalIconSVG : '';
                
                zone.innerHTML = `
                    <button class="clear-btn" aria-label="Verwijder lens">&times;</button>
                    <div class="subcode-title">${titleIcon}${titleText}</div>
                    <div class="subcode-name">${slot.name}</div>
                    <p class="subcode-type">${slot.type}</p>
                `;
                zone.querySelector('.clear-btn')?.addEventListener('click', () => this.handleClearSlot(index));
            } else {
                zone.innerHTML = `<span class="placeholder-text">Sleep lens ${index + 1} hier</span>`;
            }
            
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));

            this.synthesisDropZonesContainer.appendChild(zone);
        });
    }

    private renderSynthesisExamples() {
        this.synthesisExamplesContainer.innerHTML = '';
        SYNTHESIS_EXAMPLES.forEach(example => {
            const card = document.createElement('div');
            card.className = 'example-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Laad voorbeeld: ${example.title}`);
    
            const lensesHTML = example.lenses.map(lens => {
                if (!lens) return '';
                const title = lens.code === '__GENERAL__' ? lens.lensCode : lens.code;
                return `<span class="example-lens-tag">${title}</span>`;
            }).join('');
    
            card.innerHTML = `
                <h5 class="example-card-title">${example.title}</h5>
                <p class="example-card-description">${example.description}</p>
                <div class="example-card-lenses">${lensesHTML}</div>
            `;
            
            card.addEventListener('click', () => this.handleLoadExample(example));
            card.addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    this.handleLoadExample(example);
                }
            });
    
            this.synthesisExamplesContainer.appendChild(card);
        });
    }

    private handleLoadExample(example: SynthesisExample) {
        this.synthesisRitualTextInput.value = example.ritualText;
        this.synthesisResultTextarea.value = example.synthesisText;
        this.setState({ synthesisSlots: example.lenses });
    }

    private handleDragStart(e: DragEvent) {
        const target = e.target as HTMLElement;
        target.classList.add('dragging');
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', JSON.stringify({
                lensCode: target.dataset.lensCode,
                subCode: target.dataset.subCode,
            }));
        }
    }

    private handleDragEnd(e: DragEvent) {
        (e.target as HTMLElement).classList.remove('dragging');
    }

    private handleDragOver(e: DragEvent) {
        e.preventDefault();
        const target = (e.currentTarget as HTMLElement);
        if(target.classList.contains('drop-zone')){
            target.classList.add('drag-over');
        }
    }

    private handleDragLeave(e: DragEvent) {
        const target = (e.currentTarget as HTMLElement);
         if(target.classList.contains('drop-zone')){
            target.classList.remove('drag-over');
        }
    }
    
    private handleDrop(e: DragEvent) {
        e.preventDefault();
        const target = (e.currentTarget as HTMLElement);
        target.classList.remove('drag-over');

        const slotIndex = parseInt(target.dataset.slotIndex!, 10);
        const data = JSON.parse(e.dataTransfer!.getData('text/plain'));
        const lens = LENSES_DATA.find(l => l.code === data.lensCode);
        if(!lens) return;

        let slotData: (LensSubCode & { lensCode: string }) | null = null;
        
        if (data.subCode === GENERAL_ANALYSIS_CODE) {
            slotData = {
                lensCode: lens.code,
                code: GENERAL_ANALYSIS_CODE,
                name: `${lens.name} (Algemeen)`,
                type: lens.description,
                prompts: [] // Not needed for display in drop zone
            };
        } else {
            const subCode = lens.subCodes.find(sc => sc.code === data.subCode);
            if (subCode) {
                slotData = { ...subCode, lensCode: lens.code };
            }
        }

        if (slotData) {
            const newSlots = [...this.state.synthesisSlots];
            newSlots[slotIndex] = slotData;
            this.setState({ synthesisSlots: newSlots });
        }
    }

    private handleClearSlot(index: number) {
        const newSlots = [...this.state.synthesisSlots];
        newSlots[index] = null;
        this.setState({ synthesisSlots: newSlots });
    }

    private handleClearAllSlots() {
        this.setState({ synthesisSlots: [null, null, null, null] });
    }

    private updateSynthesisButtonState() {
        const ritualText = this.synthesisRitualTextInput.value;
        const allSlotsFilled = this.state.synthesisSlots.every(slot => slot !== null);
        this.synthesisGenerateBtn.disabled = !allSlotsFilled || !ritualText.trim();
    }

    private async handleSynthesis() {
        this.updateSynthesisButtonState();
        if(this.synthesisGenerateBtn.disabled) return;

        this.setState({ isSynthesizing: true, isSynthesisResultModalOpen: true, synthesisResultText: '' });

        this.synthesisGenerateBtn.disabled = true;
        this.synthesisGenerateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg><span>Synthese genereren...</span>`;
        this.synthesisResultTextarea.value = "De AI bereidt een gelaagde synthese voor op basis van de vier gekozen lenzen. Dit kan even duren...";
        this.synthesisResultTextarea.classList.remove('error');

        const ritualText = this.synthesisRitualTextInput.value;
        const lensDescriptions = this.state.synthesisSlots.map((slot, index) => {
             if (!slot) return '';
             const title = slot.code === GENERAL_ANALYSIS_CODE ? slot.name : `${slot.name} (${slot.lensCode}/${slot.code})`;
             return `${index + 1}. **${title}**: ${slot.type}`;
        }).join('\n');

        const prompt = `U bent een meester-exegeet gespecialiseerd in gelaagde symbolische analyse. Uw taak is om de volgende rituele tekst te analyseren en een geïntegreerde synthese te schrijven. Beschouw de tekst NIET vanuit vier losse perspectieven, maar weef de inzichten van de volgende vier conceptuele lenzen samen tot één coherent, gelaagd betoog. Focus op de interacties, spanningen en synergieën tussen de lenzen om tot een dieper, eengemaakt inzicht te komen. De gekozen lenzen zijn:\n${lensDescriptions}\n\nPresenteer uw analyse als één vloeiende, inzichtelijke synthese.\n\n--- RITUELE TEKST ---\n${ritualText}\n--- EINDE TEKST ---`;

        try {
            const response = await this.ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            const resultText = response.text;
            this.synthesisResultTextarea.value = resultText;
            this.setState({ synthesisResultText: resultText, isSynthesizing: false });
        } catch (error) {
            console.error("AI Synthesis Error:", error);
            const errorMessage = `Er is een fout opgetreden bij de AI-synthese. Controleer uw API-sleutel en probeer het later opnieuw. Details: ${error instanceof Error ? error.message : String(error)}`;
            this.synthesisResultTextarea.value = errorMessage;
            this.synthesisResultTextarea.classList.add('error');
            this.setState({ synthesisResultText: errorMessage, isSynthesizing: false });
        } finally {
            this.updateSynthesisButtonState();
            this.synthesisGenerateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg><span>Genereer Synthese</span>`;
        }
    }

    private async handleCopySynthesisResult() {
        try {
            await navigator.clipboard.writeText(this.synthesisResultModalTextarea.value);
            
            const buttonSpan = this.synthesisResultCopyBtn.querySelector('span');
            if (!buttonSpan) return;

            const originalText = buttonSpan.textContent;
            buttonSpan.textContent = 'Gekopieerd!';
            this.synthesisResultCopyBtn.disabled = true;

            setTimeout(() => {
                buttonSpan.textContent = originalText;
                this.synthesisResultCopyBtn.disabled = false;
            }, 2000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            const buttonSpan = this.synthesisResultCopyBtn.querySelector('span');
            if (!buttonSpan) return;
            const originalText = buttonSpan.textContent;
            buttonSpan.textContent = 'Kopiëren mislukt';
            setTimeout(() => {
                buttonSpan.textContent = originalText;
            }, 2000);
        }
    }

    private handleSaveSynthesisResult() {
        const text = this.synthesisResultModalTextarea.value;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'RituaLens_Synthese.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }


    // --- Lens Explorer View Methods ---

    private renderLensExplorer() {
        const fragment = document.createDocumentFragment();

        LENS_CATEGORIES.forEach(category => {
            const categorySection = document.createElement('section');
            categorySection.className = 'explorer-category-section';
            categorySection.innerHTML = `
                <div class="explorer-category-header">
                    <span class="explorer-category-icon">${category.icon}</span>
                    <div>
                        <h2 class="explorer-category-title">${category.name}</h2>
                        <p class="explorer-category-description">${category.description}</p>
                    </div>
                </div>
            `;
            
            const lensesForCategory = LENSES_DATA.filter(lens => lens.categories.includes(category.code));
            
            lensesForCategory.forEach(lens => {
                 const lensSection = this.createExplorerLensSection(`${lens.name} (${lens.code})`, lens.description);
                const lensGrid = lensSection.querySelector('.explorer-grid')!;
                if (lens.subCodes.length > 0) {
                    lens.subCodes.forEach(subCode => {
                        lensGrid.appendChild(this.createExplorerCard(subCode));
                    });
                } else {
                    lensGrid.innerHTML = '<p class="card-section-content">Deze lens is nog niet in detail uitgewerkt.</p>';
                }
                categorySection.appendChild(lensSection);
            });

            fragment.appendChild(categorySection);
        });
        
        this.lensExplorerView.innerHTML = '';
        this.lensExplorerView.appendChild(fragment);
    }

    private createExplorerLensSection(title: string, description: string): HTMLElement {
        const section = document.createElement('section');
        section.className = 'explorer-section';
        section.innerHTML = `
            <h3 class="explorer-section-title">${title}</h3>
            <p class="explorer-section-description">${description}</p>
            <div class="explorer-grid"></div>
        `;
        return section;
    }

    private createExplorerCard(item: LensSubCode): HTMLElement {
        const card = document.createElement('div');
        card.className = 'explorer-card';
        
        const promptsHTML = `
            <h4 class="card-section-title">Analyse-prompt / Kernvragen</h4>
            <div class="card-section-content prompts">
                <ul>${item.prompts.map(p => `<li>${p.question}</li>`).join('')}</ul>
            </div>
        `;

        card.innerHTML = `
            <div class="explorer-card-header">
                <div class="code">${item.code}</div>
                <div class="name">${item.name}</div>
            </div>
            <div class="explorer-card-body">
                <h4 class="card-section-title">Type / Functie</h4>
                <p class="card-section-content">${item.type}</p>
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