'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var DEFAULT_SETTINGS = {
    template: '- $link'
};
var AddLinkToCurrentNotePlugin = /** @class */ (function (_super) {
    __extends(AddLinkToCurrentNotePlugin, _super);
    function AddLinkToCurrentNotePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // addLinkToBacklinks() {
        //     const currentView = this.app.workspace.activeLeaf.view
        //     if (!(currentView instanceof MarkdownView)) {
        //         return
        //     }
        //
        //     const currentFile = currentView.file
        //
        //     // @ts-ignore
        //     const backlinks = this.app.metadataCache.getBacklinksForFile(currentFile)?.data
        //     const backlinkPaths = Object.keys(backlinks)
        // }
        _this.addBacklink = function (files) { return __awaiter(_this, void 0, void 0, function () {
            var currentView, fileName, filesToProduce, currentFile, currentFileLink, lineToPaste, succeed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentView = this.app.workspace.activeLeaf.view;
                        fileName = currentView.getDisplayText();
                        filesToProduce = files
                            ? files
                            : currentView instanceof obsidian.MarkdownView
                                ? this.getFilesFromLineOrSelection(currentView)
                                : [];
                        if (!(currentView instanceof obsidian.MarkdownView)) {
                            return [2 /*return*/];
                        }
                        currentFile = currentView.file;
                        currentFileLink = this.app.fileManager.generateMarkdownLink(currentFile, currentFile.path);
                        lineToPaste = this.settings.template.replace('$link', currentFileLink);
                        succeed = [];
                        return [4 /*yield*/, Promise.all(filesToProduce.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var vault, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!file) return [3 /*break*/, 3];
                                            vault = this.app.vault;
                                            return [4 /*yield*/, vault.read(file)];
                                        case 1:
                                            data = _a.sent();
                                            return [4 /*yield*/, vault.modify(file, data + "\n" + lineToPaste)];
                                        case 2:
                                            _a.sent();
                                            succeed.push(file);
                                            _a.label = 3;
                                        case 3: return [2 /*return*/, Promise.resolve()];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        new obsidian.Notice("Add link [[" + fileName + "]] to " + succeed.map(function (e) { return e.basename; }).join(','));
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    AddLinkToCurrentNotePlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading plugin');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new CrosslinkSettingsTab(this.app, this));
                        this.addCommand({
                            id: 'add-link-to-current',
                            name: 'add links to the notes from the line or selection',
                            callback: this.addBacklink.bind(this),
                            hotkeys: []
                        });
                        this.addCommand({
                            id: 'add-link-from-quick-switcher',
                            name: 'add links to the note from the quick switcher',
                            callback: function () {
                                var modal = new FilesModal(_this.app, _this);
                                modal.open();
                            },
                            hotkeys: []
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AddLinkToCurrentNotePlugin.prototype.onunload = function () {
        console.log('unloading plugin');
    };
    AddLinkToCurrentNotePlugin.prototype.getFilesFromLineOrSelection = function (view) {
        var _this = this;
        var cm = view.editor;
        var cursor = cm.getCursor();
        var selectedRange = cm.getSelection();
        var line = selectedRange || cm.getLine(cursor.line);
        var regexpMD = /(\[.+?])\(.+?\)/gi;
        var regexpWiki = /\[\[.+?]]/gi;
        var linksWiki = line.match(regexpWiki) || [];
        var linksMD = line.match(regexpMD) || [];
        var ar = [linksWiki, linksMD].filter(function (e) { return e.length; });
        return ar.flat().map(function (lnk) {
            var _a, _b, _c;
            var wikiName = lnk
                .replace(/(\[\[|]])/g, '')
                .replace(/\|.+/, '')
                .replace(/#.+/, '');
            var mdName = decodeURI((_c = (_b = (_a = lnk.match(/\(.+?\)/)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.replace('.md', '')) === null || _c === void 0 ? void 0 : _c.replace(/[()]/g, ''));
            return _this.getFilesByName(wikiName) || _this.getFilesByName(mdName);
        });
    };
    AddLinkToCurrentNotePlugin.prototype.getFilesByName = function (name) {
        var files = this.app.vault.getFiles();
        if (Array.isArray(name)) {
            return files.filter(function (e) { return name.includes(e.name)
                || name.includes((e.path))
                || name.includes(e.basename); })[0];
        }
        return files.filter(function (e) { return e.name === name
            || e.path === name
            || e.basename === name; })[0];
    };
    AddLinkToCurrentNotePlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    AddLinkToCurrentNotePlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AddLinkToCurrentNotePlugin;
}(obsidian.Plugin));
var FilesModal = /** @class */ (function (_super) {
    __extends(FilesModal, _super);
    function FilesModal(app, plugin) {
        var _this = _super.call(this, app) || this;
        _this.EMPTY_TEXT = 'Files not found';
        _this.plugin = plugin;
        _this.init();
        return _this;
    }
    FilesModal.prototype.init = function () {
        this.files = this.app.vault.getMarkdownFiles();
        this.emptyStateText = this.EMPTY_TEXT;
        // this.setPlaceholder(PLACEHOLDER_TEXT);
        this.setInstructions([
            { command: '↑↓', purpose: 'to navigate' },
            { command: '↵', purpose: 'to append link to the file' },
            { command: 'esc', purpose: 'to dismiss' }
        ]);
        this.initNewNoteItem();
    };
    FilesModal.prototype.getItems = function () {
        return this.files;
    };
    FilesModal.prototype.getItemText = function (item) {
        this.noSuggestion = false;
        return item.basename;
    };
    FilesModal.prototype.onNoSuggestion = function () {
        this.noSuggestion = true;
    };
    FilesModal.prototype.onChooseItem = function (item, evt) {
        if (this.noSuggestion) ;
        else {
            this.plugin.addBacklink([item]);
        }
    };
    FilesModal.prototype.initNewNoteItem = function () {
        this.newNoteResult = document.createElement('div');
        this.newNoteResult.addClasses(['suggestion-item', 'is-selected']);
        this.suggestionEmpty = document.createElement('div');
        this.suggestionEmpty.addClass('suggestion-empty');
        this.suggestionEmpty.innerText = this.EMPTY_TEXT;
    };
    FilesModal.prototype.itemInstructionMessage = function (resultEl, message) {
        var el = document.createElement('kbd');
        el.addClass('suggestion-hotkey');
        el.innerText = message;
        resultEl.appendChild(el);
    };
    return FilesModal;
}(obsidian.FuzzySuggestModal));
var CrosslinkSettingsTab = /** @class */ (function (_super) {
    __extends(CrosslinkSettingsTab, _super);
    function CrosslinkSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    CrosslinkSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for "Add links to the current note" plugin' });
        new obsidian.Setting(containerEl)
            .setName('Template')
            .setDesc('How the link will be pasted. `$link` will be replaced with link itself.')
            .addText(function (text) { return text
            .setValue(_this.plugin.settings.template)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.template = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
    };
    return CrosslinkSettingsTab;
}(obsidian.PluginSettingTab));

module.exports = AddLinkToCurrentNotePlugin;


/* nosourcemap */