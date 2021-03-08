var config = require('../config.json');
const Command = require('./Command.js');

const fs = require('fs');
const { Channel } = require('discord.js');
const encoder = 'utf8';

//Category: Embed Colors
const color = 0xFF9900; //orange (default)
const e_color = 0xFD0061; //red (error)

//Category: Roles
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
const marioEmote = config.MARIO_EMOTE;
const dkEmote = config.DK_EMOTE;
const linkEmote = config.LINK_EMOTE;
const samusEmote = config.SAMUS_EMOTE;
const dSamusEmote = config.DARK_SAMUS_EMOTE;
const yoshiEmote = config.YOSHI_EMOTE;
const kirbyEmote = config.KIRBY_EMOTE;
const foxEmote = config.FOX_EMOTE;
const pikachuEmote = config.PIKACHU_EMOTE;
const luigiEmote = config.LUIGI_EMOTE;
const nessEmote = config.NESS_EMOTE;
const cFalconEmote = config.CAPTAIN_FALCON_EMOTE;
const puffEmote = config.JIGGLYTPUFF_EMOTE;

//Category: Page 2 Emotes
const peachEmote = config.PEACH_EMOTE;
const daisyEmote = config.DAISY_EMOTE;
const bowserEmote = config.BOWSER_EMOTE;
const iceClimbersEmote = config.ICE_CLIMBERS_EMOTE;
const sheikEmote = config.SHEIK_EMOTE;
const zeldaEmote = config.ZELDA_EMOTE;
const drMarioEmote = config.DR_MARIO_EMOTE;
const pichuEmote = config.PICHU_EMOTE;
const falcoEmote = config.FALCO_EMOTE;
const marthEmote = config.MARTH_EMOTE;
const lucinaEmote = config.LUCINA_EMOTE;
const yLinkEmote = config.YOUNG_LINK_EMOTE;
const ganonEmote = config.GANONDORF_EMOTE;

//Category: Page 3 Emotes
const mewTwoEmote = config.MEWTWO_EMOTE;
const royEmote = config.ROY_EMOTE;
const chromEmote = config.CHROM_EMOTE;
const gameAndWatchEmote = config.GAME_AND_WATCH_EMOTE;
const metaKnightEmote = config.META_KNIGHT_EMOTE;
const pitEmote = config.PIT_EMOTE;
const darkPitEmote = config.DARK_PIT_EMOTE;
const zeroSuitEmote = config.ZERO_SUIT_EMOTE;
const warioEmote = config.WARIO_EMOTE;
const snakeEmote = config.SNAKE_EMOTE;
const ikeEmote = config.IKE_EMOTE;
const PKEmote = config.IVYSAUR_EMOTE;
const diddyEmote = config.DIDDY_EMOTE;

//Category: Page 4 Emotes
const lucasEmote = config.LUCAS_EMOTE;
const sonicEmote = config.SONIC_EMOTE;
const kingDeDeDeEmote = config.KING_DEDEDE_EMOTE;
const olimarEmote = config.OLIMAR_EMOTE;
const lucarioEmote = config.LUCARIO_EMOTE;
const robEmote = config.ROB_EMOTE;
const toonLinkEmote = config.TOON_LINK_EMOTE;
const wolfEmote = config.WOLF_EMOTE;
const villagerEmote = config.VILLAGER_EMOTE;
const megaManEmote = config.MEGA_MAN_EMOTE;
const wiiFitEmote = config.WII_FIT_EMOTE;
const rosalinaEmote = config.ROSALINA_EMOTE;
const littleMacEmote = config.LITTLE_MAC_EMOTE;

//Category: Page 5 Emotes
const greninjaEmote = config.GRENINJA_EMOTE;
const palutenaEmote = config.PALUTENA_EMOTE;
const pacManEmote = config.PAC_MAN_EMOTE;
const robinEmote = config.ROBIN_EMOTE;
const shulkEmote = config.SHULK_EMOTE;
const bowserJREmote = config.BOWSER_JR_EMOTE;
const duckHuntEmote = config.DUCK_HUNT_EMOTE;
const ryuEmote = config.RYU_EMOTE;
const kenEmote = config.KEN_EMOTE;
const cloudEmote = config.CLOUD_EMOTE;
const corrinEmote = config.CORRIN_EMOTE;
const bayonettaEmote = config.BAYONETTA_EMOTE;
const inklingEmote = config.INKLING_EMOTE;

//Category: Page 6 Emotes
const ridleyEmote = config.RIDLEY_EMOTE;
const simonEmote = config.SIMON_EMOTE;
const richterEmote = config.RICHTER_EMOTE;
const kRoolEmote = config.KING_K_ROOL_EMOTE;
const isabelleEmote = config.ISABELLE_EMOTE;
const incineroarEmote = config.INCINEROAR_EMOTE;
const plantEmote = config.PIRANHA_PLANT_EMOTE;
const jokerEmote = config.JOKER_EMOTE;
const heroEmote = config.HERO_EMOTE;
const banjoEmote = config.BANJO_AND_KAZOOIE_EMOTE;
const terryEmote = config.TERRY_EMOTE;
const bylethEmote = config.BYLETH_EMOTE;
const minMinEmote = config.MIN_MIN_EMOTE;

//Category: Page 7 Emotes
const steveEmote = config.STEVE_EMOTE;
const sephirothEmote = config.SEPHIROTH_EMOTE;
const pyraEmote = config.PYRA_EMOTE;
const mythraEmote = config.MYTHRA_EMOTE;
const brawlerEmote = config.MII_BRAWLER_EMOTE;
const swordEmote = config.MII_SWORDFIGHTER_EMOTE;
const gunnerEmote = config.MII_GUNNER_EMOTE;

class RoleMenu extends Command {
    constructor(msg, client) {
        super(msg);
        if ((msg.member.roles.cache.has(admin))) {
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