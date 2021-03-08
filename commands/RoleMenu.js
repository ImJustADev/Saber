const Command = require('../api/Command.js');
const fs = require('fs');
const encoder = 'utf8';

// Configs
var config = require('../config.json');
var emote_config = require ('../emote.json');

const color = config.EMBED_COLOR;
const e_color = config.EMBED_ERROR_COLOR;

var guild_id = config.GUILD_ID; // Guild ID
var head_gecko = config.SELF_ID; // Myself (Blaze)

var gecko = config.GECKO_ROLE_ID; // Gecko
var admin = config.ADMIN_ROLE_ID; // Admin
var mod = config.MOD_ROLE_ID; // Mod
var friend = config.FRIEND_ROLE_ID; // Friend

//Category: Development
var docs = config.DOCUMENTATION_CHANNEL_ID; // #documentation
var templates = config.TEMPLATES_CHANNEL_ID; // #templates
var response = config.RESPONSE_CHANNEL_ID; // #response
var format = config.FORMAT_CHANNEL_ID; // #format

//Category: Important
var welcome = config.WELCOME_CHANNEL_ID; // #welcome
var announcements = config.ANNOUNCEMENT_CHANNEL_ID; // #announcements
var changelog = config.CHANGELOG_CHANNEL_ID; // #changelog
var boosts = config.BOOSTS_CHANNEL_ID; // #boosts
var roles = config.ROLE_CHANNEL_ID; // #roles

//Category: Text Channels
var general = config.GENERAL_CHANNEL_ID; // #general
var bot_cmds = config.BOT_CMDS_CHANNEL_ID; // #bot-cmds

//Category: Voice Channels
var vc_1 = config.VC1_ID; // #vc-1
var vc_2 = config.VC2_ID; // #vc-2
var vc_afk = config.VCAFK_ID; // #vc-afk

//Category: Arenas (Defaults Only)
var arena_1 = config.A1_ID; // #arena-1
var arena_2 = config.A2_ID; // #arena-2
var arena_3 = config.A3_ID; // #arena-3
var arena_4 = config.A4_ID; // #arena-4


//Category: Page 1 Emotes
const marioEmote = emote_config.MARIO_EMOTE;
const dkEmote = emote_config.DK_EMOTE;
const linkEmote = emote_config.LINK_EMOTE;
const samusEmote = emote_config.SAMUS_EMOTE;
const dSamusEmote = emote_config.DARK_SAMUS_EMOTE;
const yoshiEmote = emote_config.YOSHI_EMOTE;
const kirbyEmote = emote_config.KIRBY_EMOTE;
const foxEmote = emote_config.FOX_EMOTE;
const pikachuEmote = emote_config.PIKACHU_EMOTE;
const luigiEmote = emote_config.LUIGI_EMOTE;
const nessEmote = emote_config.NESS_EMOTE;
const cFalconEmote = emote_config.CAPTAIN_FALCON_EMOTE;
const puffEmote = emote_config.JIGGLYTPUFF_EMOTE;

//Category: Page 2 Emotes
const peachEmote = emote_config.PEACH_EMOTE;
const daisyEmote = emote_config.DAISY_EMOTE;
const bowserEmote = emote_config.BOWSER_EMOTE;
const iceClimbersEmote = emote_config.ICE_CLIMBERS_EMOTE;
const sheikEmote = emote_config.SHEIK_EMOTE;
const zeldaEmote = emote_config.ZELDA_EMOTE;
const drMarioEmote = emote_config.DR_MARIO_EMOTE;
const pichuEmote = emote_config.PICHU_EMOTE;
const falcoEmote = emote_config.FALCO_EMOTE;
const marthEmote = emote_config.MARTH_EMOTE;
const lucinaEmote = emote_config.LUCINA_EMOTE;
const yLinkEmote = emote_config.YOUNG_LINK_EMOTE;
const ganonEmote = emote_config.GANONDORF_EMOTE;

//Category: Page 3 Emotes
const mewTwoEmote = emote_config.MEWTWO_EMOTE;
const royEmote = emote_config.ROY_EMOTE;
const chromEmote = emote_config.CHROM_EMOTE;
const gameAndWatchEmote = emote_config.GAME_AND_WATCH_EMOTE;
const metaKnightEmote = emote_config.META_KNIGHT_EMOTE;
const pitEmote = emote_config.PIT_EMOTE;
const darkPitEmote = emote_config.DARK_PIT_EMOTE;
const zeroSuitEmote = emote_config.ZERO_SUIT_EMOTE;
const warioEmote = emote_config.WARIO_EMOTE;
const snakeEmote = emote_config.SNAKE_EMOTE;
const ikeEmote = emote_config.IKE_EMOTE;
const PKEmote = emote_config.IVYSAUR_EMOTE;
const diddyEmote = emote_config.DIDDY_EMOTE;

//Category: Page 4 Emotes
const lucasEmote = emote_config.LUCAS_EMOTE;
const sonicEmote = emote_config.SONIC_EMOTE;
const kingDeDeDeEmote = emote_config.KING_DEDEDE_EMOTE;
const olimarEmote = emote_config.OLIMAR_EMOTE;
const lucarioEmote = emote_config.LUCARIO_EMOTE;
const robEmote = emote_config.ROB_EMOTE;
const toonLinkEmote = emote_config.TOON_LINK_EMOTE;
const wolfEmote = emote_config.WOLF_EMOTE;
const villagerEmote = emote_config.VILLAGER_EMOTE;
const megaManEmote = emote_config.MEGA_MAN_EMOTE;
const wiiFitEmote = emote_config.WII_FIT_EMOTE;
const rosalinaEmote = emote_config.ROSALINA_EMOTE;
const littleMacEmote = emote_config.LITTLE_MAC_EMOTE;

//Category: Page 5 Emotes
const greninjaEmote = emote_config.GRENINJA_EMOTE;
const palutenaEmote = emote_config.PALUTENA_EMOTE;
const pacManEmote = emote_config.PAC_MAN_EMOTE;
const robinEmote = emote_config.ROBIN_EMOTE;
const shulkEmote = emote_config.SHULK_EMOTE;
const bowserJREmote = emote_config.BOWSER_JR_EMOTE;
const duckHuntEmote = emote_config.DUCK_HUNT_EMOTE;
const ryuEmote = emote_config.RYU_EMOTE;
const kenEmote = emote_config.KEN_EMOTE;
const cloudEmote = emote_config.CLOUD_EMOTE;
const corrinEmote = emote_config.CORRIN_EMOTE;
const bayonettaEmote = emote_config.BAYONETTA_EMOTE;
const inklingEmote = emote_config.INKLING_EMOTE;

//Category: Page 6 Emotes
const ridleyEmote = emote_config.RIDLEY_EMOTE;
const simonEmote = emote_config.SIMON_EMOTE;
const richterEmote = emote_config.RICHTER_EMOTE;
const kRoolEmote = emote_config.KING_K_ROOL_EMOTE;
const isabelleEmote = emote_config.ISABELLE_EMOTE;
const incineroarEmote = emote_config.INCINEROAR_EMOTE;
const plantEmote = emote_config.PIRANHA_PLANT_EMOTE;
const jokerEmote = emote_config.JOKER_EMOTE;
const heroEmote = emote_config.HERO_EMOTE;
const banjoEmote = emote_config.BANJO_AND_KAZOOIE_EMOTE;
const terryEmote = emote_config.TERRY_EMOTE;
const bylethEmote = emote_config.BYLETH_EMOTE;
const minMinEmote = emote_config.MIN_MIN_EMOTE;

//Category: Page 7 Emotes
const steveEmote = emote_config.STEVE_EMOTE;
const sephirothEmote = emote_config.SEPHIROTH_EMOTE;
const pyraEmote = emote_config.PYRA_EMOTE;
const mythraEmote = emote_config.MYTHRA_EMOTE;
const brawlerEmote = emote_config.MII_BRAWLER_EMOTE;
const swordEmote = emote_config.MII_SWORDFIGHTER_EMOTE;
const gunnerEmote = emote_config.MII_GUNNER_EMOTE;

class RoleMenu extends Command {
    constructor(msg, client) {
        super(msg);
        if ((msg.member.hasPermission("ADMINISTRATOR"))) {
            if (msg.channel.id === roles) {
                msg.delete();

                //cleaner embed builder maybe? (2/28/2021) (Blaze)
                msg.channel.send(
                    {
                        embed: {
                            author: {
                                name: "Please read the below information about assigning server role(s)",
                                "icon_url": "https://cdn.discordapp.com/attachments/816877389018824704/816878422524559401/orange.png"
                            },
                            title: "About this Channel",
                            color: color,
                            description: "Welcome to the <#814179912780087318> channel\nHere you can select roles to add to your profile. View each category and assign roles by reacting to the corresponding emotes below each of the sections to add/remove that role.\n",
                            fields: [
                                {
                                    name: "\u200B",
                                    value: "**ROLE SELECTION GUIDE**\u200B"
                                },
                                {
                                    name: "\u200B",
                                    value: "\u200B"
                                },
                                {
                                    name: "**Row 1**",
                                    value: ""
                                        + marioEmote + "- Mario\n"
                                        + dkEmote + "- Donkey Kong\n"
                                        + linkEmote + "- Link\n"
                                        + samusEmote + "- Samus\n"
                                        + dSamusEmote + "- Dark Samus\n"
                                        + yoshiEmote + "- Yoshi\n"
                                        + kirbyEmote + "- Kirby\n"
                                        + foxEmote + "- Fox\n"
                                        + pikachuEmote + "- Pikachu\n"
                                        + luigiEmote + "- Luigi\n"
                                        + nessEmote + "- Ness\n"
                                        + cFalconEmote + "- Captain Falcon\n"
                                        + puffEmote + "- Jigglypuff\n",
                                    inline: true
                                },
                                {
                                    name: "**Row 2**",
                                    value: ""
                                        + peachEmote + "- Peach\n"
                                        + daisyEmote + "- Daisy\n"
                                        + bowserEmote + "- Bowser\n"
                                        + iceClimbersEmote + "- Ice Climbers\n"
                                        + sheikEmote + "- Sheik\n"
                                        + zeldaEmote + "- Zelda\n"
                                        + drMarioEmote + "- Dr Mario\n"
                                        + pichuEmote + "- Pichu\n"
                                        + falcoEmote + "- Falco\n"
                                        + marthEmote + "- Marth\n"
                                        + lucinaEmote + "- Lucina\n"
                                        + yLinkEmote + "- Young Link\n"
                                        + ganonEmote + "- Ganondorf\n",
                                    inline: true
                                },
                                {
                                    name: "**Row 3**",
                                    value: ""
                                        + mewTwoEmote + "- Mewtwo\n"
                                        + royEmote + "- Roy\n"
                                        + chromEmote + "- Chrom\n"
                                        + gameAndWatchEmote + "- Game & Watch\n"
                                        + metaKnightEmote + "- Meta Knight\n"
                                        + pitEmote + "- Pit\n"
                                        + darkPitEmote + "- Dark Pit\n"
                                        + zeroSuitEmote + "- Zero Suit\n"
                                        + warioEmote + "- Wario\n"
                                        + snakeEmote + "- Snake\n"
                                        + ikeEmote + "- Ike\n"
                                        + PKEmote + "- PK Trainer\n"
                                        + diddyEmote + "- Diddy Kong\n",
                                    inline: true
                                },
                                {
                                    name: "\u200B",
                                    value: "\u200B"
                                },
                                {
                                    name: "**Row 4**",
                                    value: ""
                                        + lucasEmote + "- Lucas\n"
                                        + sonicEmote + "- Sonic\n"
                                        + kingDeDeDeEmote + "- King Dedede\n"
                                        + olimarEmote + "- Olimar\n"
                                        + lucarioEmote + "- Lucario\n"
                                        + robEmote + "- R.O.B\n"
                                        + toonLinkEmote + "- Toon Link\n"
                                        + wolfEmote + "- Wolf\n"
                                        + villagerEmote + "- Villager\n"
                                        + megaManEmote + "- Mega Man\n"
                                        + wiiFitEmote + "- Wii Fit Trainer\n"
                                        + rosalinaEmote + "- Rosalina & Luma\n"
                                        + littleMacEmote + "- Little Mac\n",
                                    inline: true
                                },
                                {
                                    name: "**Row 5**",
                                    value: ""
                                        + greninjaEmote + "- Greninja\n"
                                        + palutenaEmote + "- Palutena\n"
                                        + pacManEmote + "- Pac Man\n"
                                        + robinEmote + "- Robin\n"
                                        + shulkEmote + "- Shulk\n"
                                        + bowserJREmote + "- Bowser Jr\n"
                                        + duckHuntEmote + "- Duck Hunt\n"
                                        + ryuEmote + "- Ryu\n"
                                        + kenEmote + "- Ken\n"
                                        + cloudEmote + "- Cloud\n"
                                        + corrinEmote + "- Corrin\n"
                                        + bayonettaEmote + "- Bayonetta\n"
                                        + inklingEmote + "- Inkling\n",
                                    inline: true
                                },
                                {
                                    name: "**Row 6**",
                                    value: ""
                                        + ridleyEmote + "- Ridley\n"
                                        + simonEmote + "- Simon\n"
                                        + richterEmote + "- Richter\n"
                                        + kRoolEmote + "- King K. Rool\n"
                                        + isabelleEmote + "- Isabelle\n"
                                        + incineroarEmote + "- Incineroar\n"
                                        + brawlerEmote + "- Mii Brawler\n"
                                        + swordEmote + "- Mii Swordfighter\n"
                                        + gunnerEmote + "- Mii Gunner\n",
                                    inline: true
                                },
                                {
                                    name: "\u200B",
                                    value: "\u200B"
                                },
                                {
                                    name: "**Row 7 - DLC FIGHTERS**",
                                    value: ""
                                        + steveEmote + "- ✨ Steve\n"
                                        + sephirothEmote + "- ✨ Sephiroth\n"
                                        + pyraEmote + "- ✨ Pyra\n"
                                        + mythraEmote + "- ✨ Mythra\n"
                                        + plantEmote + "- ✨ Piranha Plant\n"
                                        + jokerEmote + "- ✨ Joker\n",
                                    inline: true
                                },
                                {
                                name: "**Row 7a - DLC FIGHTERS**",
                                value: ""
                                + heroEmote + "- ✨ Hero\n"
                                + banjoEmote + "- ✨ Banjo & Kazooie\n"
                                + terryEmote + "- ✨ Terry\n"
                                + bylethEmote + "- ✨ Byleth\n"
                                + minMinEmote + "- ✨ Min Min\n",
                                inline: true
                            },
                            ],
                            footer: {
                                text: "Page 1 of 1",
                            },
                        }
                    });

                    /*
                    .then(msg => {
                        msg.react(marioEmote);
                        msg.react(dkEmote);
                        msg.react(linkEmote);
                        msg.react(samusEmote);
                        msg.react(dSamusEmote);
                        msg.react(yoshiEmote);
                        msg.react(kirbyEmote);
                        msg.react(foxEmote);
                        msg.react(pikachuEmote);
                        msg.react(luigiEmote);
                        msg.react(nessEmote);
                        msg.react(cFalconEmote);
                        msg.react(puffEmote);

                        msg.react(peachEmote);
                        msg.react(daisyEmote);
                        msg.react(bowserEmote);
                        msg.react(iceClimbersEmote);
                        msg.react(sheikEmote);
                        msg.react(zeldaEmote);
                        msg.react(drMarioEmote);
                        msg.react(pichuEmote);
                        msg.react(falcoEmote);
                        msg.react(marthEmote);
                        msg.react(lucinaEmote);
                        msg.react(yLinkEmote);
                        msg.react(ganonEmote);


                        
                    });
                    */

            }


        }

        //Invalid Channel Error Embed
        else {
            msg.channel.send({
                embed: {
                    author: {
                        name: "[ERR13] TreccoBot has detected an issue!",
                    },
                    title: "Reason ➔ Unauthorized User",
                    color: e_color,
                    description: "\n\nYou cannot execute this command!\nStaff have been notified of this event.\nIf this is bug, please contact an admin immediately.",
                }
            });
        }
    }
}

module.exports = RoleMenu;