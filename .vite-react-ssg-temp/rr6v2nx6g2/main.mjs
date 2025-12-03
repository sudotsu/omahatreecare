import { Head, ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { MapPin, Award, Target, Phone, Mail, ArrowRight, CheckCircle, FileQuestion, BarChart3, Lightbulb, X, Menu, Snowflake, Wind, Search, Wrench, Heart, GraduationCap, TreeDeciduous, AlertTriangle, Bug, DollarSign, HelpCircle, Info, AlertCircle, XCircle, ThermometerSun, ArrowLeft, Sun, Moon, Send, Clock, Shield } from "lucide-react";
import { useNavigate, useSearchParams, Link, useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { injectSpeedInsights } from "@vercel/speed-insights";
const Credibility = () => {
  const features = [
    {
      icon: MapPin,
      title: "Omaha-Specific",
      description: "EAB, soil conditions, local climate"
    },
    {
      icon: Award,
      title: "Real Science",
      description: "Based on ISA arborist standards"
    },
    {
      icon: Target,
      title: "Honest Assessment",
      description: "Even if you need nothing"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", style: { backgroundColor: "#ffffff" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-4xl mx-auto", children: features.map((feature, index) => {
    const Icon = feature.icon;
    return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-16 h-16 rounded-full flex items-center justify-center",
          style: { backgroundColor: "#e8ebe6" },
          children: /* @__PURE__ */ jsx(Icon, { size: 28, style: { color: "#52796f" }, "aria-hidden": "true" })
        }
      ) }),
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", style: { color: "#3d3027" }, children: feature.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", style: { color: "#6b5d54" }, children: feature.description })
    ] }, index);
  }) }) }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { style: { backgroundColor: "#3d3027" }, className: "pt-12 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold mb-4 text-sm tracking-wider uppercase", style: { color: "#f8f6f1" }, children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", style: { color: "#c4bbb0" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("a", { href: "tel:+14028123294", className: "hover:opacity-70 transition-opacity font-medium", children: "(402) 812-3294" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Mail, { size: 16, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:andrew@midwestroots.info", className: "hover:opacity-70 transition-opacity", children: "andrew@midwestroots.info" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold mb-4 text-sm tracking-wider uppercase", style: { color: "#f8f6f1" }, children: "Service Areas" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", style: { color: "#c4bbb0" }, children: [
          /* @__PURE__ */ jsx("li", { children: "Omaha, NE" }),
          /* @__PURE__ */ jsx("li", { children: "Bellevue, NE" }),
          /* @__PURE__ */ jsx("li", { children: "Papillion, NE" }),
          /* @__PURE__ */ jsx("li", { children: "La Vista, NE" }),
          /* @__PURE__ */ jsx("li", { children: "Gretna, NE" }),
          /* @__PURE__ */ jsx("li", { children: "Elkhorn, NE" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold mb-4 text-sm tracking-wider uppercase", style: { color: "#f8f6f1" }, children: "About This Site" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mb-3", style: { color: "#c4bbb0" }, children: "Free tree care resources and diagnostic tools for Omaha homeowners." }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: "#8b8175" }, children: [
          "Built by ",
          /* @__PURE__ */ jsx("a", { href: "https://midwestroots.info", className: "font-semibold hover:opacity-70 transition-opacity", style: { color: "#c1666b" }, children: "Midwest Roots Tree Services" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t pt-6 text-center text-xs", style: { borderColor: "#6b5d54", color: "#8b8175" }, children: /* @__PURE__ */ jsx("p", { children: "© 2025 Midwest Roots Tree Services. All rights reserved." }) })
  ] }) });
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("header", { className: "relative pt-32 pb-24 md:pt-40 md:pb-32", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-stone-50 to-stone-100" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight", style: { color: "#3d3027" }, children: [
        "Know Your Tree Risk",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { style: { color: "#52796f" }, children: "Before Winter Storms Hit" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto", style: { color: "#6b5d54" }, children: [
        "Free winter prep diagnostic tool. Assess ice storm damage risk,",
        /* @__PURE__ */ jsx("br", {}),
        "get honest recommendations. Omaha-specific. 10 minutes."
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/tools",
          className: "group inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 hover:shadow-lg",
          style: {
            backgroundColor: "#52796f",
            color: "#ffffff"
          },
          children: [
            "Start Free Assessment",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 group-hover:translate-x-1 transition-transform", size: 20, "aria-hidden": "true" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium", style: { color: "#8b8175" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "mr-2", style: { color: "#52796f" }, "aria-hidden": "true" }),
          "No email required"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "mr-2", style: { color: "#52796f" }, "aria-hidden": "true" }),
          "Instant results"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "mr-2", style: { color: "#52796f" }, "aria-hidden": "true" }),
          "ISA standards"
        ] })
      ] })
    ] }) })
  ] });
};
const HowItWorks = () => {
  const steps = [
    {
      icon: FileQuestion,
      title: "Describe Your Tree",
      description: "Answer questions about species, health, and location"
    },
    {
      icon: BarChart3,
      title: "Get Risk Level",
      description: "Instant assessment: low, high, or extreme risk"
    },
    {
      icon: Lightbulb,
      title: "Know Your Options",
      description: "Clear next steps and realistic cost ranges"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", style: { backgroundColor: "#f8f6f1" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-12", style: { color: "#3d3027" }, children: "How It Works" }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: steps.map((step, index) => {
      const Icon = step.icon;
      return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold", style: { backgroundColor: "#52796f", color: "#ffffff" }, children: index + 1 }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Icon, { size: 32, style: { color: "#52796f" }, "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", style: { color: "#3d3027" }, children: step.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", style: { color: "#6b5d54" }, children: step.description })
        ] }),
        index < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute top-12 -right-4 text-2xl", style: { color: "#c4bbb0" }, children: "→" })
      ] }, index);
    }) })
  ] }) }) });
};
const Navigation = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `fixed w-full z-50 transition-all duration-300 ${scrolled ? "shadow-md backdrop-blur-sm py-3" : "py-5"}`,
      style: {
        backgroundColor: scrolled ? "rgba(248, 246, 241, 0.95)" : "transparent"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-xl leading-tight", style: { color: "#3d3027" }, children: "Omaha Tree Care" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wide", style: { color: "#8b8175" }, children: "Tools & Resources" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-6", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/tools",
                className: "font-medium text-sm transition-colors hover:opacity-70",
                style: { color: "#52796f" },
                children: "Free Tool"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+14028123294",
                className: "font-semibold px-5 py-2 rounded-lg transition-all transform hover:-translate-y-0.5",
                style: {
                  backgroundColor: "#52796f",
                  color: "#ffffff"
                },
                children: "(402) 812-3294"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "md:hidden",
              onClick: toggleMenu,
              "aria-label": isMenuOpen ? "Close menu" : "Open menu",
              "aria-expanded": isMenuOpen,
              style: { color: "#3d3027" },
              children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 28 }) : /* @__PURE__ */ jsx(Menu, { size: 28 })
            }
          )
        ] }),
        isMenuOpen && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "md:hidden absolute top-full left-0 w-full shadow-lg p-6 flex flex-col space-y-4",
            style: { backgroundColor: "#f8f6f1" },
            children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/tools",
                  className: "text-lg font-medium",
                  onClick: toggleMenu,
                  style: { color: "#52796f" },
                  children: "Free Tool"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:+14028123294",
                  className: "font-semibold py-3 rounded-lg text-center",
                  onClick: toggleMenu,
                  style: {
                    backgroundColor: "#52796f",
                    color: "#ffffff"
                  },
                  children: "(402) 812-3294"
                }
              )
            ]
          }
        )
      ]
    }
  );
};
const SocialProof = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", style: { backgroundColor: "#ffffff" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-lg mb-8", style: { color: "#6b5d54" }, children: [
      /* @__PURE__ */ jsx("span", { className: "font-bold text-2xl block mb-2", style: { color: "#52796f" }, children: "1,200+" }),
      "Omaha homeowners have used this tool"
    ] }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "/tools",
        className: "group inline-flex items-center justify-center text-lg font-semibold px-10 py-4 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 hover:shadow-lg",
        style: {
          backgroundColor: "#52796f",
          color: "#ffffff"
        },
        children: [
          "Start Your Free Assessment",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 group-hover:translate-x-1 transition-transform", size: 20, "aria-hidden": "true" })
        ]
      }
    )
  ] }) }) });
};
const WinterTriage = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-to-b from-stone-100 to-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", style: { color: "#3d3027" }, children: "Winter Tree Preparation for Omaha Homeowners" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg max-w-2xl mx-auto", style: { color: "#6b5d54" }, children: "Our free diagnostic tool helps you prepare for winter weather, assess storm damage, and know when to call a pro" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-lg border-2 transition-all hover:shadow-xl", style: { borderColor: "#52796f" }, children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto", style: { backgroundColor: "#e8f5f2" }, children: /* @__PURE__ */ jsx(Snowflake, { size: 32, style: { color: "#52796f" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-center", style: { color: "#3d3027" }, children: "Before Winter Storms" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 leading-relaxed", style: { color: "#6b5d54" }, children: "Identify weak branches before ice accumulation. Our tool helps you spot widow makers, weak unions, and trees at risk of failure during Omaha's brutal ice storms." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/tools",
            className: "group inline-flex items-center justify-center w-full text-center font-semibold px-6 py-3 rounded-lg transition-all",
            style: { backgroundColor: "#52796f", color: "#ffffff" },
            children: [
              "Prep Your Trees",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 group-hover:translate-x-1 transition-transform", size: 18 })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-lg border-2 transition-all hover:shadow-xl", style: { borderColor: "#c1666b" }, children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto", style: { backgroundColor: "#fef2f2" }, children: /* @__PURE__ */ jsx(Wind, { size: 32, style: { color: "#c1666b" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-center", style: { color: "#3d3027" }, children: "After Storm Damage" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 leading-relaxed", style: { color: "#6b5d54" }, children: "Storm passed and now you've got split trunks, hanging limbs, or leaning trees? Use our tool to assess the damage and know if it's DIY-safe or time to call a pro." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/tools",
            className: "group inline-flex items-center justify-center w-full text-center font-semibold px-6 py-3 rounded-lg transition-all",
            style: { backgroundColor: "#c1666b", color: "#ffffff" },
            children: [
              "Assess Damage",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 group-hover:translate-x-1 transition-transform", size: 18 })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-lg border-2 transition-all hover:shadow-xl", style: { borderColor: "#52796f" }, children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto", style: { backgroundColor: "#e8f5f2" }, children: /* @__PURE__ */ jsx(Search, { size: 32, style: { color: "#52796f" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 text-center", style: { color: "#3d3027" }, children: "Not Sure? Our Tool Knows" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 leading-relaxed", style: { color: "#6b5d54" }, children: "Can't tell if your tree is dangerous or just ugly? Our arborist-grade diagnostic cuts through the confusion and gives you a clear answer in 10 minutes." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/tools",
            className: "group inline-flex items-center justify-center w-full text-center font-semibold px-6 py-3 rounded-lg transition-all",
            style: { backgroundColor: "#52796f", color: "#ffffff" },
            children: [
              "Get Answers",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 group-hover:translate-x-1 transition-transform", size: 18 })
            ]
          }
        )
      ] })
    ] })
  ] }) });
};
const WhyDifferent = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-20", style: { backgroundColor: "#f8f6f1" }, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", style: { color: "#3d3027" }, children: 'Not Another "We Cut Trees Good" Website' }),
      /* @__PURE__ */ jsx("p", { className: "text-lg max-w-2xl mx-auto", style: { color: "#6b5d54" }, children: "Most tree services just want your money. We built a free diagnostic tool to help you make informed decisions." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto", style: { backgroundColor: "#e8f5f2" }, children: /* @__PURE__ */ jsx(Wrench, { size: 40, style: { color: "#52796f" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", style: { color: "#3d3027" }, children: "Arborist-Grade Diagnostic Tool" }),
        /* @__PURE__ */ jsx("p", { className: "leading-relaxed", style: { color: "#6b5d54" }, children: "Not a gimmick. Our free tool uses ISA risk assessment standards and Omaha-specific data to give you honest answers about your trees." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto", style: { backgroundColor: "#fef2f2" }, children: /* @__PURE__ */ jsx(Heart, { size: 40, style: { color: "#c1666b" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", style: { color: "#3d3027" }, children: "We'll Tell You if You Can DIY" }),
        /* @__PURE__ */ jsx("p", { className: "leading-relaxed", style: { color: "#6b5d54" }, children: "If your tree is healthy or safe for you to handle, we'll tell you. No pressure, no upselling, no BS. Your safety and wallet matter more than our profits." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto", style: { backgroundColor: "#e8f5f2" }, children: /* @__PURE__ */ jsx(GraduationCap, { size: 40, style: { color: "#52796f" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", style: { color: "#3d3027" }, children: "Education-First Approach" }),
        /* @__PURE__ */ jsx("p", { className: "leading-relaxed", style: { color: "#6b5d54" }, children: "We teach you what to look for, what questions to ask, and how to spot red flags from predatory tree services. Knowledge is power." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg border-2", style: { borderColor: "#52796f" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx(CheckCircle, { size: 28, style: { color: "#52796f", flexShrink: 0 }, className: "mt-1" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3", style: { color: "#3d3027" }, children: "The Bottom Line" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed", style: { color: "#6b5d54" }, children: "If you complete our diagnostic tool and decide you don't need a tree service, we're happy for you. If you decide you need help, we'll be here. Either way, you made an informed decision based on science, not sales tactics." })
      ] })
    ] }) })
  ] }) });
};
const useScrollPosition = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrolled;
};
const HomePage = () => {
  const scrolled = useScrollPosition();
  const colors = {
    // Terracotta
    background: "#f8f6f1",
    // Cream
    text: "#3d3027"
    // Dark brown
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "min-h-screen font-sans selection:bg-opacity-20",
      style: {
        backgroundColor: colors.background,
        color: colors.text
      },
      children: [
        /* @__PURE__ */ jsxs(Head, { prioritizeSeoTags: true, children: [
          /* @__PURE__ */ jsx("title", { children: "Omaha Tree Care - Free Diagnostic Tools & Resources" }),
          /* @__PURE__ */ jsx("meta", { name: "description", content: "Free tree diagnostic tools for Omaha homeowners. Assess tree risk, get cost estimates, and access expert tree care resources. Omaha-specific, science-based, honest assessments." }),
          /* @__PURE__ */ jsx("meta", { name: "keywords", content: "Omaha tree care, tree diagnostic tool, tree risk assessment, Omaha tree service, tree health assessment, EAB treatment, tree removal cost, Bellevue tree service, Papillion tree care, La Vista trees, Gretna tree service, Elkhorn tree care" }),
          /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
          /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://omahatreecare.com/" }),
          /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Omaha Tree Care - Free Diagnostic Tools & Resources" }),
          /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Free tree risk assessment tool for Omaha homeowners. Get instant cost estimates and expert recommendations based on arborist science." }),
          /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
          /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://omahatreecare.com/" }),
          /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://omahatreecare.com/images/og-image.jpg" }),
          /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
          /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
          /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: "Professional tree care services and free diagnostic tools for Omaha homeowners" })
        ] }),
        /* @__PURE__ */ jsx(Navigation, { scrolled }),
        /* @__PURE__ */ jsx(Hero, {}),
        /* @__PURE__ */ jsx(WinterTriage, {}),
        /* @__PURE__ */ jsx(WhyDifferent, {}),
        /* @__PURE__ */ jsx(Credibility, {}),
        /* @__PURE__ */ jsx(HowItWorks, {}),
        /* @__PURE__ */ jsx(SocialProof, {}),
        /* @__PURE__ */ jsx(Footer, {})
      ]
    }
  );
};
function Home({ setScreen }) {
  const tools = [
    {
      id: "species",
      icon: TreeDeciduous,
      title: "Species Identifier",
      description: "Identify your tree species and learn about its care needs",
      color: "from-green-600 to-emerald-700",
      iconBg: "bg-green-100",
      iconColor: "text-green-700"
    },
    {
      id: "hazard",
      icon: AlertTriangle,
      title: "Hazard Assessment",
      description: "Check if your tree poses a safety risk to your property",
      color: "from-orange-600 to-red-700",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700"
    },
    {
      id: "ailments",
      icon: Bug,
      title: "Common Problems",
      description: "Diagnose diseases, pests, and other tree health issues",
      color: "from-purple-600 to-pink-700",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700"
    },
    {
      id: "diy",
      icon: Wrench,
      title: "DIY vs Professional",
      description: "Learn what you can do yourself and when to call a pro",
      color: "from-blue-600 to-cyan-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700"
    },
    {
      id: "cost",
      icon: DollarSign,
      title: "Cost Estimator",
      description: "Get typical price ranges for common tree services",
      color: "from-yellow-600 to-amber-700",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-700"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-fade-in", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-amber-900 dark:text-emerald-400 mb-4 transition-colors duration-300", children: "Your Free Tree Care Assistant" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-amber-800 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300", children: "Professional arborist knowledge at your fingertips. Identify problems, assess risks, and make informed decisions about your trees." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: tools.map((tool, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setScreen(tool.id),
        className: "group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1",
        style: {
          animationDelay: `${index * 100}ms`,
          animation: "slideUp 0.6s ease-out forwards"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300` }),
          /* @__PURE__ */ jsxs("div", { className: "relative p-6", children: [
            /* @__PURE__ */ jsx("div", { className: `${tool.iconBg} dark:bg-opacity-20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`, children: /* @__PURE__ */ jsx(tool.icon, { className: `w-8 h-8 ${tool.iconColor}` }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-2 group-hover:text-amber-800 dark:group-hover:text-emerald-400 transition-colors", children: tool.title }),
            /* @__PURE__ */ jsx("p", { className: "text-amber-700 dark:text-slate-400 text-sm leading-relaxed", children: tool.description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-4 text-amber-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })
        ]
      },
      tool.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 transition-colors duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-amber-900 dark:text-emerald-400 mb-4 transition-colors duration-300", children: "Why We Created This Tool" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-amber-800 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300", children: "At Midwest Roots Tree Services, we believe in educating homeowners. When you understand your trees, you make better decisions for your property and your budget." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(TreeDeciduous, { className: "w-8 h-8 text-green-700 dark:text-emerald-400" }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-amber-900 dark:text-slate-200 mb-2", children: "Expert Knowledge" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 dark:text-slate-400", children: "Professional arborist insights, simplified for homeowners" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-8 h-8 text-blue-700 dark:text-blue-400" }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-amber-900 dark:text-slate-200 mb-2", children: "No Pressure" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 dark:text-slate-400", children: "Use our tools without any obligation or sales pitch" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-8 h-8 text-yellow-700 dark:text-yellow-400" }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-amber-900 dark:text-slate-200 mb-2", children: "Save Money" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 dark:text-slate-400", children: "Learn what you can DIY and when to call the pros" })
        ] })
      ] })
    ] })
  ] });
}
const treeDatabase = [
  {
    name: "Ash Trees",
    scientificName: "Fraxinus spp.",
    riskLevel: "high",
    characteristics: ["Compound leaves (5-11 leaflets)", "Opposite branching", "Diamond-pattern bark"],
    commonIssues: [
      "Emerald Ash Borer (EAB) - 99% mortality if untreated",
      "Rapid decline: 2-4 years from infestation to death",
      "Brittle wood when dead = extreme hazard"
    ],
    maintenanceNotes: "Remove all untreated ash unless active EAB treatment program in place. Treatment requires trunk injections every 2 years ($10-15 per diameter inch).",
    size: "50-80 feet"
  },
  {
    name: "Silver Maple",
    scientificName: "Acer saccharinum",
    riskLevel: "high",
    characteristics: ["Deeply lobed leaves with silvery undersides", "Fast growth", "Shallow roots"],
    commonIssues: [
      "Weak wood prone to storm breakage",
      "Aggressive surface roots damage sidewalks/foundations",
      "V-shaped branch unions split easily",
      "Short lifespan (60-80 years) with rapid decline"
    ],
    maintenanceNotes: "Requires regular pruning every 3-5 years. Monitor branch unions closely. Plan for eventual removal matures.",
    size: "50-80 feet"
  },
  {
    name: "Cottonwood",
    scientificName: "Populus deltoides",
    riskLevel: "high",
    characteristics: ["Large triangular leaves", "Thick ridged bark", "Massive size"],
    commonIssues: [
      "Brittle branches with frequent limb drop",
      "Aggressive roots seek water lines",
      'Large dead branches ("widow makers")',
      "Short lifespan for size (70-100 years)"
    ],
    maintenanceNotes: "Keep away from structures. Regular dead-wooding is essential for safety.",
    size: "70-100+ feet"
  },
  {
    name: "Bradford Pear",
    scientificName: "Pyrus calleryana",
    riskLevel: "high",
    characteristics: ["White spring flowers", "Oval shape", "Tight branching"],
    commonIssues: [
      "Weak branch attachments causing catastrophic splitting at 15-20 years",
      "All branches emerge at similar angle creating structural weakness",
      "Ice/wind storms cause total failures"
    ],
    maintenanceNotes: "Remove proactively before maturity. Do not plant new Bradford Pears.",
    size: "30-50 feet"
  },
  {
    name: "Bur Oak",
    scientificName: "Quercus macrocarpa",
    riskLevel: "low",
    characteristics: ['Large lobed leaves with "bur" on acorn cap', "Massive spreading form", "Thick bark"],
    commonIssues: [
      "Slow growth makes replacement difficult",
      "Iron chlorosis on alkaline soils (but more tolerant than pin oak)",
      "Oak wilt (rare but fatal)"
    ],
    strengths: ["Extremely long-lived (200-300 years)", "Very strong wood", "Drought-tolerant"],
    maintenanceNotes: "Preserve when possible. Prune ONLY October-March (outside oak wilt season). Deep root fertilization helps with chlorosis.",
    size: "70-80 feet spread"
  },
  {
    name: "Red Oak",
    scientificName: "Quercus rubra",
    riskLevel: "low",
    characteristics: ["Pointed leaf lobes", "Reddish fall color", "Gray furrowed bark"],
    commonIssues: [
      "Oak wilt susceptibility (DO NOT prune April-July)",
      "Iron chlorosis on alkaline soils"
    ],
    strengths: ["Fast-growing for an oak", "Strong wood", "Beautiful fall color"],
    maintenanceNotes: "Prune ONLY October-March. Monitor for oak wilt symptoms (rapid leaf browning from top down).",
    size: "60-75 feet"
  },
  {
    name: "Hackberry",
    scientificName: "Celtis occidentalis",
    riskLevel: "moderate",
    characteristics: ["Warty bark", "Elm-like leaves", "Very adaptable"],
    commonIssues: [
      "Witches' broom (harmless but unsightly)",
      "Occasionally develops co-dominant stems"
    ],
    strengths: ["Extremely tough", "Wind-resistant", "Drought-tolerant"],
    maintenanceNotes: "Low-maintenance tree. Excellent ash replacement option.",
    size: "40-60 feet"
  },
  {
    name: "Honeylocust",
    scientificName: "Gleditsia triacanthos",
    riskLevel: "moderate",
    characteristics: ["Fine compound leaves", "Delicate appearance", "Thornless cultivars common"],
    commonIssues: [
      "Cankers can develop on stressed trees",
      "Occasional branch dieback"
    ],
    strengths: ["Drought-tolerant", "Filtered shade", "Clean fall cleanup"],
    maintenanceNotes: "Standard maintenance. Good urban tree choice.",
    size: "30-70 feet"
  },
  {
    name: "American Elm (Resistant)",
    scientificName: "Ulmus americana",
    riskLevel: "moderate",
    characteristics: ["Vase-shaped form", "Saw-toothed leaves", "Graceful branching"],
    commonIssues: [
      "Dutch Elm Disease in non-resistant varieties",
      "Elm leaf beetle"
    ],
    strengths: ["Classic form", "Rapid growth", "Disease-resistant cultivars available"],
    maintenanceNotes: 'Choose resistant cultivars like "Valley Forge". Regular monitoring for DED symptoms.',
    size: "60-80 feet"
  },
  {
    name: "Kentucky Coffeetree",
    scientificName: "Gymnocladus dioicus",
    riskLevel: "low",
    characteristics: ["Very large compound leaves", "Thick rough bark", "Unique winter silhouette"],
    commonIssues: [
      "Large pods create minor litter",
      "Slow to leaf out in spring"
    ],
    strengths: ["Extremely tough", "No major pests", "Adaptable to urban conditions"],
    maintenanceNotes: "Excellent ash replacement. Native Midwest species. Very low maintenance.",
    size: "60-75 feet"
  }
];
function SpeciesIdentifier() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTree, setSelectedTree] = useState(null);
  const filteredTrees = treeDatabase.filter(
    (tree) => tree.name.toLowerCase().includes(searchTerm.toLowerCase()) || tree.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "text-red-700 bg-red-100";
      case "moderate":
        return "text-yellow-700 bg-yellow-100";
      case "low":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };
  const getRiskIcon = (level) => {
    switch (level) {
      case "high":
        return AlertCircle;
      case "low":
        return CheckCircle;
      default:
        return Info;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Tree Species Identifier" }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-slate-300 leading-relaxed", children: "Identify common Omaha-area tree species and learn about their specific care requirements, potential issues, and maintenance needs." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by common or scientific name...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-12 pr-4 py-4 rounded-xl border-2 dark:border-slate-600 border-amber- dark:border-slate-200 dark:border-slate-600 focus:border-amber-500 focus:outline-none text-lg"
        }
      )
    ] }) }),
    !selectedTree && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filteredTrees.map((tree, index) => {
      const RiskIcon = getRiskIcon(tree.riskLevel);
      return /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedTree(tree),
          className: "w-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all p-5 text-left group",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 group-hover:text-amber-700 dark:text-slate-400 transition-colors", children: tree.name }),
                /* @__PURE__ */ jsxs("span", { className: `px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRiskColor(tree.riskLevel)}`, children: [
                  /* @__PURE__ */ jsx(RiskIcon, { className: "w-3 h-3" }),
                  tree.riskLevel === "high" ? "High Risk" : tree.riskLevel === "moderate" ? "Moderate Risk" : "Low Risk"
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 dark:text-slate-400 italic", children: tree.scientificName })
            ] }),
            /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-amber-600 transform group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ] })
        },
        index
      );
    }) }),
    selectedTree && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-amber-800 to-yellow-700 text-white p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-2", children: selectedTree.name }),
            /* @__PURE__ */ jsx("p", { className: "text-amber-100 italic text-lg", children: selectedTree.scientificName })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTree(null),
              className: "text-white/80 hover:text-white transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: `px-4 py-2 rounded-full font-semibold ${getRiskColor(selectedTree.riskLevel)}`, children: selectedTree.riskLevel === "high" ? "🔴 High Risk" : selectedTree.riskLevel === "moderate" ? "🟡 Moderate Risk" : "🟢 Low Risk" }),
          /* @__PURE__ */ jsxs("span", { className: "text-amber-100", children: [
            "Typical Size: ",
            selectedTree.size
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5" }),
            "Key Characteristics"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selectedTree.characteristics.map((char, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-amber-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-emerald-400 mt-1", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: char })
          ] }, i)) })
        ] }),
        selectedTree.strengths && selectedTree.strengths.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600 dark:text-emerald-400" }),
            "Strengths"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selectedTree.strengths.map((strength, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-amber-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-emerald-400 mt-1", children: "✓" }),
            /* @__PURE__ */ jsx("span", { children: strength })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-orange-600" }),
            "Common Issues"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selectedTree.commonIssues.map((issue, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-amber-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx("span", { className: "text-orange-600 mt-1", children: "⚠" }),
            /* @__PURE__ */ jsx("span", { children: issue })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 dark:bg-slate-700/50 rounded-xl p-5 border-2 border-amber- dark:border-slate-200 dark:border-slate-600", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Maintenance Recommendations" }),
          /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-slate-300 leading-relaxed", children: selectedTree.maintenanceNotes })
        ] }),
        selectedTree.riskLevel === "high" ? /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-red-900 dark:text-red-200 mb-3 text-center", children: "⚠️ High-Risk Species - Get Expert Help" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+14028123294",
                className: "block w-full px-6 py-3 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center",
                children: "📞 Call Andrew: (402) 812-3294"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:andrew@midwestroots.info?subject=Question%20About%20My%20Tree%20-%20From%20Species%20Guide",
                className: "block w-full px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center",
                children: "📧 Email for Free Advice"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-blue-900 dark:text-blue-200 mb-3 text-center", children: "Questions About Your Tree?" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:andrew@midwestroots.info?subject=Question%20About%20My%20Tree%20-%20From%20Species%20Guide",
                className: "block w-full px-6 py-3 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center",
                children: "📧 Ask an Expert"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+14028123294",
                className: "block w-full px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center text-sm",
                children: "📞 (402) 812-3294"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function EmailCaptureModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (window.gtag) {
      gtag("event", "email_capture", {
        event_category: "lead_generation",
        event_label: "low_risk_email",
        value: 1
      });
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail("");
      }, 2e3);
    }, 1e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition",
        "aria-label": "Close",
        children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
      }
    ),
    !isSuccess ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-green-600 dark:text-green-400" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-2", children: "Great News! Your Tree Looks Healthy" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300", children: "Want to keep it that way? Get seasonal care tips delivered to your inbox." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Email Address" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                id: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "you@example.com",
                required: true,
                className: "w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 disabled:transform-none",
            children: isSubmitting ? "Subscribing..." : "Get Tree Care Tips"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 text-center", children: "Free seasonal tips • No spam • Unsubscribe anytime" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-slate-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3", children: "You'll receive:" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-slate-600 dark:text-slate-400", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "Spring pruning reminders (optimal timing for Omaha trees)" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "Winter storm prep checklist (before the ice hits)" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: "EAB updates and ash tree protection tips" })
          ] })
        ] })
      ] })
    ] }) : (
      /* Success state */
      /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-12 h-12 text-green-600 dark:text-green-400" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-2", children: "You're All Set!" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300", children: "Check your inbox for a confirmation email." })
      ] })
    )
  ] }) });
}
function HazardAssessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [assessment, setAssessment] = useState({
    likelihood: 0,
    consequence: 0,
    issues: []
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const calculateRisk = () => assessment.likelihood * assessment.consequence;
  const getRiskLevel = () => {
    const risk = calculateRisk();
    if (risk >= 9) return { level: "Extreme", color: "red", action: "Immediate action required (0-14 days)" };
    if (risk >= 6) return { level: "High", color: "orange", action: "Priority service within 30-60 days" };
    if (risk >= 3) return { level: "Moderate", color: "yellow", action: "Schedule maintenance within 90 days" };
    return { level: "Low", color: "green", action: "Monitor during regular visits" };
  };
  const questions = [
    {
      title: "Root & Trunk Condition",
      description: "Check the base of your tree for these warning signs",
      options: [
        { text: "Tree appears healthy with no visible defects", value: 1, issues: [] },
        { text: "Minor issues like small cracks or minor lean", value: 2, issues: ["Minor structural defects"] },
        { text: "Significant cracks, large cavities, or noticeable lean", value: 3, issues: ["Significant structural defects"] },
        { text: "Severe lean, major cracks, mushrooms at base, or lifting soil", value: 4, issues: ["Severe structural damage", "Root decay indicators"] }
      ]
    },
    {
      title: "Branch Structure",
      description: "Look at the branches and overall tree structure",
      options: [
        { text: "Branches appear strong and well-attached", value: 1, issues: [] },
        { text: "Some dead branches or minor structural issues", value: 2, issues: ["Dead branches present"] },
        { text: "Multiple dead branches, weak attachments, or co-dominant stems", value: 3, issues: ["Multiple dead branches", "Weak branch unions"] },
        { text: "Large dead branches, severe storm damage, or major splits", value: 4, issues: ["Large dead limbs (widow makers)", "Major storm damage"] }
      ]
    },
    {
      title: "Tree Health",
      description: "Assess the overall health and foliage",
      options: [
        { text: "Full, healthy canopy with good color", value: 1, issues: [] },
        { text: "Some thinning or minor discoloration", value: 2, issues: ["Minor canopy thinning"] },
        { text: "Significant die-back or less than 50% normal foliage", value: 3, issues: ["Significant die-back", "Sparse foliage"] },
        { text: "Tree is dead or dying with minimal living tissue", value: 4, issues: ["Tree in severe decline or dead"] }
      ]
    },
    {
      title: "Target Assessment",
      description: "What could be damaged if the tree or branches fail?",
      options: [
        { text: "Remote area, no structures or people nearby", value: 1, issues: [] },
        { text: "Occasional use area, some property at risk", value: 2, issues: [] },
        { text: "Frequent use area, near structures or regular parking", value: 3, issues: [] },
        { text: "House, garage, or high-traffic area directly below", value: 4, issues: [] }
      ],
      isConsequence: true
    }
  ];
  const handleAnswer = (value, issues = [], isConsequence = false) => {
    if (isConsequence) {
      setAssessment((prev) => ({ ...prev, consequence: value }));
    } else {
      setAssessment((prev) => ({
        ...prev,
        likelihood: Math.max(prev.likelihood, value),
        issues: [.../* @__PURE__ */ new Set([...prev.issues, ...issues])]
      }));
    }
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };
  const reset = () => {
    setStep(0);
    setAssessment({ likelihood: 0, consequence: 0, issues: [] });
  };
  const isComplete = step === questions.length - 1 && assessment.consequence > 0;
  const currentQuestion = questions[step];
  if (isComplete) {
    const risk = getRiskLevel();
    const riskScore = calculateRisk();
    return /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: `bg-gradient-to-r ${risk.color === "red" ? "from-red-600 to-red-800" : risk.color === "orange" ? "from-orange-600 to-orange-800" : risk.color === "yellow" ? "from-yellow-600 to-yellow-800" : "from-green-600 to-green-800"} text-white p-8`, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          risk.color === "red" && /* @__PURE__ */ jsx(AlertTriangle, { className: "w-20 h-20 mx-auto" }),
          risk.color === "orange" && /* @__PURE__ */ jsx(AlertTriangle, { className: "w-20 h-20 mx-auto" }),
          risk.color === "yellow" && /* @__PURE__ */ jsx(Info, { className: "w-20 h-20 mx-auto" }),
          risk.color === "green" && /* @__PURE__ */ jsx(CheckCircle, { className: "w-20 h-20 mx-auto" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-bold mb-2", children: [
          risk.level,
          " Risk"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-white/90", children: [
          "Risk Score: ",
          riskScore,
          " / 16"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 dark:bg-slate-700/50 border-2 border-amber-200 dark:border-slate-600 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Recommended Action" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-amber-800 dark:text-slate-300", children: risk.action })
        ] }),
        assessment.issues.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Issues Identified" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: assessment.issues.map((issue, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-amber-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: issue })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-blue-900 dark:text-blue-200 mb-3", children: "What This Means" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-blue-900 dark:text-blue-200", children: [
            riskScore >= 9 && /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Extreme Risk:" }),
              " This tree poses an immediate safety hazard. We strongly recommend contacting a professional arborist within 2 weeks. Consider restricting access to the area until the tree is assessed."
            ] }),
            riskScore >= 6 && riskScore < 9 && /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "High Risk:" }),
              " This tree has significant structural issues that should be addressed soon. Professional evaluation and corrective action (pruning, cabling, or removal) should be scheduled within 30-60 days."
            ] }),
            riskScore >= 3 && riskScore < 6 && /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Moderate Risk:" }),
              " The tree has some issues that warrant attention but aren't immediately urgent. Schedule a professional inspection and maintenance within the next 90 days. Regular monitoring is recommended."
            ] }),
            riskScore < 3 && /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Low Risk:" }),
              " Your tree appears to be in good condition! Continue regular monitoring and consider annual inspections. Standard maintenance practices should be sufficient."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Next Steps" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-amber-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-emerald-400 mt-1", children: "1." }),
              /* @__PURE__ */ jsx("span", { children: "Document the tree with photos for professional review" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-emerald-400 mt-1", children: "2." }),
              /* @__PURE__ */ jsx("span", { children: "Get a professional evaluation from a certified arborist" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-emerald-400 mt-1", children: "3." }),
              /* @__PURE__ */ jsx("span", { children: "Obtain multiple quotes for any recommended work" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-emerald-400 mt-1", children: "4." }),
              /* @__PURE__ */ jsx("span", { children: "Keep records of assessments and work performed" })
            ] })
          ] })
        ] }),
        riskScore >= 6 ? (
          // High/Extreme Risk → Emergency Page
          /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-red-900 dark:text-red-200 mb-4 text-center", children: "⚠️ Immediate Action Recommended" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    if (window.gtag) {
                      gtag("event", "high_risk_conversion", {
                        event_category: "tool_completion",
                        event_label: "emergency_page_click",
                        risk_score: riskScore
                      });
                    }
                    navigate(`/emergency-tree-service-omaha?risk=high&score=${riskScore}`);
                  },
                  className: "block w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-colors text-center shadow-lg",
                  children: "⚡ Get Emergency Help Now →"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: reset,
                  className: "block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center",
                  children: "Assess Another Tree"
                }
              )
            ] })
          ] })
        ) : riskScore >= 3 ? (
          // Moderate Risk → Consultation Page
          /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-4 text-center", children: "Professional Consultation Recommended" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    if (window.gtag) {
                      gtag("event", "moderate_risk_conversion", {
                        event_category: "tool_completion",
                        event_label: "consultation_page_click",
                        risk_score: riskScore
                      });
                    }
                    navigate(`/tree-consultation-omaha?risk=medium&score=${riskScore}`);
                  },
                  className: "block w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors text-center shadow-lg",
                  children: "📞 Get Free Consultation →"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: reset,
                  className: "block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center",
                  children: "Assess Another Tree"
                }
              )
            ] })
          ] })
        ) : (
          // Low Risk → Email Capture
          /* @__PURE__ */ jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 border-2 border-green-300 rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-green-900 dark:text-green-200 mb-4 text-center", children: "✓ Your Tree Looks Healthy!" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    if (window.gtag) {
                      gtag("event", "low_risk_email_modal", {
                        event_category: "tool_completion",
                        event_label: "email_capture_open",
                        risk_score: riskScore
                      });
                    }
                    setShowEmailModal(true);
                  },
                  className: "block w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors text-center shadow-lg",
                  children: "🌳 Get Seasonal Care Tips →"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: reset,
                  className: "block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center",
                  children: "Assess Another Tree"
                }
              )
            ] })
          ] })
        ),
        /* @__PURE__ */ jsx(
          EmailCaptureModal,
          {
            isOpen: showEmailModal,
            onClose: () => setShowEmailModal(false)
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Tree Hazard Assessment" }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-slate-300 leading-relaxed", children: "Answer a few questions to evaluate potential risks. This assessment uses professional arborist standards to calculate a risk score for your tree." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-amber-700 dark:text-slate-400 mb-2", children: [
        /* @__PURE__ */ jsx("span", { children: "Progress" }),
        /* @__PURE__ */ jsxs("span", { children: [
          step + 1,
          " of ",
          questions.length
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-amber-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-gradient-to-r from-amber-500 to-yellow-600 transition-all duration-500",
          style: { width: `${(step + 1) / questions.length * 100}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-fade-in", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-amber-900 dark:text-slate-100 mb-2", children: currentQuestion.title }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-700 dark:text-slate-400 mb-6", children: currentQuestion.description }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: currentQuestion.options.map((option, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleAnswer(option.value, option.issues, currentQuestion.isConsequence || false),
          className: "w-full p-5 text-left bg-amber-50 dark:bg-slate-700/50 hover:bg-amber-100 dark:hover:bg-slate-600 border-2 border-amber-200 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-500 rounded-xl transition-all group",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-amber-900 dark:text-slate-100 font-medium group-hover:text-amber-700 dark:text-slate-400 transition-colors", children: option.text }),
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-amber-600 transform group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ] })
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-900 dark:text-blue-200", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold mb-1", children: "Assessment Method" }),
        /* @__PURE__ */ jsx("p", { children: "This tool uses the ISA (International Society of Arboriculture) Tree Risk Assessment framework, calculating risk of Failure × Consequence of Failure." })
      ] })
    ] }) })
  ] });
}
const services = [
  {
    name: "Tree Removal",
    description: "Complete removal of tree including trunk and major branches",
    priceRange: "$400 - $3,500+",
    typical: "$800 - $1,500 for average tree",
    factors: [
      "Tree size and height",
      "Accessibility and space constraints",
      "Proximity to structures/power lines",
      "Trunk diameter",
      "Number of branches",
      "Stump removal (additional cost)",
      "Wood hauling vs. leaving on site"
    ]
  },
  {
    name: "Stump Grinding",
    description: "Grinding stump below ground level",
    priceRange: "$75 - $400",
    typical: "$150 - $250 for standard stump",
    factors: [
      "Stump diameter (charged per inch)",
      "Root spread and depth",
      "Accessibility for equipment",
      "Number of stumps (bulk discounts)",
      "Cleanup and haul-away"
    ]
  },
  {
    name: "Tree Pruning/Trimming",
    description: "Selective branch removal to improve structure and health",
    priceRange: "$200 - $1,200",
    typical: "$400 - $600 for standard pruning",
    factors: [
      "Tree size and number of branches",
      "Pruning type (structural, crown reduction, deadwood)",
      "Equipment needs (bucket truck vs. climbing)",
      "Cleanup and disposal",
      "Season (dormant vs. growing)"
    ]
  },
  {
    name: "Crown Reduction",
    description: "Reducing tree height and spread for safety or clearance",
    priceRange: "$400 - $1,500",
    typical: "$600 - $900",
    factors: [
      "Amount of reduction needed",
      "Tree species (growth pattern affects technique)",
      "Current tree size",
      "Precision required",
      "Cleanup volume"
    ]
  },
  {
    name: "Deadwood Removal",
    description: "Removing dead or dying branches",
    priceRange: "$200 - $800",
    typical: "$300 - $500",
    factors: [
      "Amount of deadwood",
      "Branch size and height",
      "Safety risk level",
      "Access difficulty",
      "Cleanup requirements"
    ]
  },
  {
    name: "Cabling & Bracing",
    description: "Installing support systems for weak branch unions",
    priceRange: "$400 - $1,200",
    typical: "$600 - $800 per installation",
    factors: [
      "Number of cables needed",
      "Tree height and access",
      "Type of system (static vs. dynamic)",
      "Inspection and monitoring setup"
    ]
  },
  {
    name: "Emergency Storm Service",
    description: "Emergency removal of storm-damaged or hazardous trees",
    priceRange: "$600 - $4,000+",
    typical: "$1,000 - $2,000",
    factors: [
      "Urgency and timing (24-hour service premium)",
      "Damage severity",
      "Safety complications",
      "Power line proximity",
      "Structure damage risk"
    ]
  },
  {
    name: "Large Tree Removal",
    description: "Removal of trees over 80 feet or 4+ feet diameter",
    priceRange: "$2,000 - $10,000+",
    typical: "$3,500 - $6,000",
    factors: [
      "Extreme size requires specialized equipment",
      "Crane rental may be necessary",
      "Multiple crew members and days",
      "High liability and insurance costs",
      "Permit requirements in some areas"
    ]
  },
  {
    name: "Ash Tree EAB Treatment",
    description: "Trunk injection treatment for Emerald Ash Borer protection",
    priceRange: "$10 - $15 per diameter inch",
    typical: "$200 - $400 every 2 years",
    factors: [
      "Tree diameter (measured at chest height)",
      "Treatment frequency (typically every 2 years)",
      "Treatment type (injection vs. soil drench)",
      "Tree health status",
      "Number of trees (discounts for multiple)"
    ]
  }
];
function CostEstimator() {
  const [selectedService, setSelectedService] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Tree Service Cost Estimator" }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-slate-300 leading-relaxed", children: "Get typical price ranges for common tree services in the Omaha area. These are estimates only - actual costs vary based on specific conditions." })
    ] }),
    !selectedService && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: services.map((service, index) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setSelectedService(service),
        className: "w-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-left group",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 group-hover:text-amber-700 dark:text-slate-400 transition-colors mb-2", children: service.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 dark:text-slate-400 mb-3", children: service.description }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-green-600 dark:text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-green-700", children: service.priceRange })
            ] })
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-amber-600 transform group-hover:translate-x-1 transition-transform flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
        ] })
      },
      index
    )) }),
    selectedService && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-green-700 to-emerald-800 text-white p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-2", children: selectedService.name }),
            /* @__PURE__ */ jsx("p", { className: "text-green-100 text-lg", children: selectedService.description })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedService(null),
              className: "text-white/80 hover:text-white transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-green-100 text-sm mb-1", children: "Price Range" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold", children: selectedService.priceRange })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-green-100 text-sm mb-1", children: "Typical Cost" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold", children: selectedService.typical })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-4", children: "Factors Affecting Cost" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: selectedService.factors.map((factor, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("span", { className: "text-amber-700 dark:text-slate-400 text-sm font-semibold", children: i + 1 }) }),
            /* @__PURE__ */ jsx("span", { className: "text-amber-800 dark:text-slate-300", children: factor })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-900 dark:text-blue-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold mb-2", children: "Getting Accurate Quotes" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("li", { children: "• Always get quotes from at least 3 reputable companies" }),
              /* @__PURE__ */ jsx("li", { children: "• Ensure quotes are in writing with detailed scope of work" }),
              /* @__PURE__ */ jsx("li", { children: "• Verify insurance and certifications (ISA certification preferred)" }),
              /* @__PURE__ */ jsx("li", { children: "• Ask about cleanup, hauling, and stump removal" }),
              /* @__PURE__ */ jsx("li", { children: "• Cheaper isn't always better - consider experience and safety" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 rounded-xl p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-yellow-900 dark:text-yellow-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold mb-2", children: "Ways to Save Money" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("li", { children: "• Schedule work during dormant season (winter) when demand is lower" }),
              /* @__PURE__ */ jsx("li", { children: "• Bundle multiple services together for efficiency discounts" }),
              /* @__PURE__ */ jsx("li", { children: "• Leave wood on site if you can use it (firewood)" }),
              /* @__PURE__ */ jsx("li", { children: "• Address issues early before they become emergencies" }),
              /* @__PURE__ */ jsx("li", { children: "• Ask about payment plans for large jobs" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-green-50 dark:bg-emerald-900/20 border-2 border-green-300 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-green-900 dark:text-emerald-200 mb-4 text-center", children: "Ready for a Free Quote?" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:andrew@midwestroots.info?subject=Free%20Quote%20Request%20from%20Cost%20Estimator&body=I'd%20like%20a%20quote%20for%20the%20following%20service:%20[SERVICE]%0A%0AMy%20address:%20%0AMy%20phone:%20%0ABest%20time%20to%20reach%20me:%20",
                className: "block w-full px-6 py-4 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-bold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center",
                children: [
                  "📧 Email for Free Written Quote",
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-normal text-green-100 mt-1", children: "Get detailed pricing for your specific situation" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+14028123294",
                className: "block w-full px-6 py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center",
                children: [
                  "📞 Call for Faster Response: (402) 812-3294",
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-normal text-blue-100 mt-1", children: "Often same-day quotes available" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.google.com/search?q=tree+removal+omaha",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center text-sm",
                children: "🔍 Compare Other Tree Services First"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    !selectedService && /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8 border-2 border-amber- dark:border-slate-200 dark:border-slate-600", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-amber-900 dark:text-slate-100 mb-4", children: "Understanding Tree Service Pricing" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-amber-900 dark:text-slate-100", children: [
        /* @__PURE__ */ jsx("p", { children: "Tree service costs vary significantly based on complexity, equipment needed, and local market rates. Here are some general guidelines:" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold mb-2", children: "Small Jobs ($200-$600)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800 dark:text-slate-300", children: "Simple pruning, small tree removal, single stump grinding. Quick jobs under 4 hours." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold mb-2", children: "Medium Jobs ($600-$1,500)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800 dark:text-slate-300", children: "Standard tree removal, crown reduction, multiple stumps. Half to full day work." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold mb-2", children: "Large Jobs ($1,500-$4,000)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800 dark:text-slate-300", children: "Large tree removal, complex rigging, multiple trees. Multi-day projects." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold mb-2", children: "Major Projects ($4,000+)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800 dark:text-slate-300", children: "Crane work, massive trees, extensive property clearing. Specialized equipment required." })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const tasks = [
  {
    name: 'Small Branch Pruning (under 2" diameter)',
    category: "safe-diy",
    description: "Removing small branches at ground level or with a ladder",
    safety: [
      "Use proper pruning shears or hand saw",
      "Make clean cuts at the branch collar",
      "Never cut branches above your head",
      "Use a stable ladder with someone to spot you"
    ],
    tools: ["Hand pruners", "Loppers", "Hand saw", "Sturdy ladder", "Safety glasses"],
    whenToCall: "If branches are near power lines or over 10 feet high"
  },
  {
    name: "Small Tree Planting",
    category: "safe-diy",
    description: "Planting trees under 6 feet tall",
    safety: [
      "Call 811 before digging to locate utilities",
      "Dig hole 2-3x wider than root ball",
      "Plant at proper depth (root flare visible)",
      "Water thoroughly after planting"
    ],
    tools: ["Shovel", "Wheelbarrow", "Garden hose", "Mulch"],
    whenToCall: "For large trees or if you hit utility lines while digging"
  },
  {
    name: "Mulching Around Trees",
    category: "safe-diy",
    description: "Applying mulch properly around tree base",
    safety: [
      "Keep mulch 3-6 inches away from trunk",
      "Apply 2-4 inch layer, no deeper",
      "Use organic mulch (wood chips, bark)",
      `Don't create "volcano mulching" against trunk`
    ],
    tools: ["Wheelbarrow", "Rake", "Mulch"],
    whenToCall: "Never - this is always safe to DIY"
  },
  {
    name: "Watering & Basic Care",
    category: "safe-diy",
    description: "Regular watering and general tree care",
    safety: [
      "Deep water (12-18 inches) weekly for young trees",
      "Water at soil level, not leaves",
      "Morning watering prevents disease",
      "Adjust for rainfall and season"
    ],
    tools: ["Garden hose", "Soaker hose (optional)"],
    whenToCall: "If tree shows signs of disease or severe stress"
  },
  {
    name: 'Medium Branch Pruning (2-4" diameter)',
    category: "risky-diy",
    description: "Pruning larger branches that require more skill",
    safety: [
      "Use three-cut method to prevent bark tearing",
      "Never use a chainsaw from a ladder",
      "Wear proper safety equipment",
      "Be aware of branch spring and tension"
    ],
    tools: ["Pole saw", "Bow saw", "Safety equipment", "Chainsaw (if experienced)"],
    whenToCall: "If branches are over head height, near power lines, or you're uncomfortable"
  },
  {
    name: "Small Stump Removal",
    category: "risky-diy",
    description: "Removing stumps under 10 inches diameter",
    safety: [
      "Excavate around stump to expose roots",
      "Cut major roots with saw or axe",
      "Pull stump with vehicle only if safe and clear",
      "Rental stump grinders are powerful and dangerous"
    ],
    tools: ["Shovel", "Axe", "Root saw", "Stump grinder rental (advanced)"],
    whenToCall: 'For stumps over 10", near utilities, or if uncomfortable with equipment'
  },
  {
    name: "Small Dead Tree Removal (under 15 feet)",
    category: "risky-diy",
    description: "Removing small dead trees with open space to fall",
    safety: [
      "Dead trees are unpredictable and brittle",
      "Ensure clear fall zone 2x tree height",
      "Use proper felling techniques",
      "Plan escape route 45° from fall direction"
    ],
    tools: ["Chainsaw", "Wedges", "Rope", "Safety gear"],
    whenToCall: "If any structures, fences, or obstacles in fall zone, or tree is leaning"
  },
  {
    name: "Any Work Over 20 Feet High",
    category: "professional-only",
    description: "Pruning, removal, or any work requiring climbing or bucket truck",
    safety: [
      "Falls from height are the #1 cause of tree work fatalities",
      "Professional arborists have specialized training and equipment",
      "Insurance rarely covers homeowner tree work injuries",
      "Difficult to judge branch weight and direction of fall from ground"
    ],
    tools: [],
    whenToCall: "Always call a professional - never attempt high tree work yourself"
  },
  {
    name: "Trees Near Power Lines",
    category: "professional-only",
    description: "Any work on trees touching or within 10 feet of power lines",
    safety: [
      "Electricity can arc through trees and tools",
      'Even "de-energized" lines can be deadly',
      "Special training and equipment required",
      "Your utility company may provide free trimming service"
    ],
    tools: [],
    whenToCall: "Always - contact utility company first, then professional tree service"
  },
  {
    name: "Large Tree Removal (over 15 feet)",
    category: "professional-only",
    description: "Removing any substantial tree",
    safety: [
      "Requires rigging, ropes, and advanced felling techniques",
      "Unpredictable forces can cause serious injury or property damage",
      "Professionals have liability insurance",
      "Heavy equipment may be needed for large trees"
    ],
    tools: [],
    whenToCall: "Always - tree removal is extremely dangerous and complex"
  },
  {
    name: "Storm-Damaged Trees",
    category: "professional-only",
    description: "Dealing with broken, hanging, or uprooted trees",
    safety: [
      "Damaged trees under tension are extremely dangerous",
      "Branches can spring with deadly force",
      'Hung-up trees ("widow makers") are unpredictable',
      "Root balls can flip back when cutting"
    ],
    tools: [],
    whenToCall: "Always - storm damage creates hidden dangers only pros can handle safely"
  },
  {
    name: "Disease Diagnosis & Treatment",
    category: "professional-only",
    description: "Identifying and treating tree diseases",
    safety: [
      "Misdiagnosis can lead to wrong treatment and wasted money",
      "Some diseases require quarantine procedures",
      "Treatment timing is critical for effectiveness",
      "Certified arborists can save trees that homeowners might remove unnecessarily"
    ],
    tools: [],
    whenToCall: "When tree shows unusual symptoms, discoloration, or decline"
  }
];
function DIYvsProGuide() {
  const safeItems = tasks.filter((t) => t.category === "safe-diy");
  const riskyItems = tasks.filter((t) => t.category === "risky-diy");
  const proItems = tasks.filter((t) => t.category === "professional-only");
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "DIY vs Professional Guide" }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-slate-300 leading-relaxed mb-4", children: "Learn which tree care tasks you can safely do yourself and when to call a professional. Your safety is the most important consideration." }),
      /* @__PURE__ */ jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-red-900 dark:text-red-200 font-medium", children: [
          /* @__PURE__ */ jsx("strong", { children: "Safety First:" }),
          " Tree work is inherently dangerous. If you have any doubt about your ability to safely complete a task, call a professional. Medical bills and property damage cost far more than hiring an expert."
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-green-600 dark:text-emerald-400" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-green-800", children: "Safe for DIY" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: safeItems.map((task, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-2 border-green-200", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-2", children: task.name }),
        /* @__PURE__ */ jsx("p", { className: "text-amber-700 dark:text-slate-400 mb-4", children: task.description }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h5", { className: "font-semibold text-green-800 mb-2", children: "Safety Tips:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1 text-sm", children: task.safety.map((tip, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-emerald-400", children: "✓" }),
              /* @__PURE__ */ jsx("span", { className: "text-amber-800 dark:text-slate-300", children: tip })
            ] }, i)) })
          ] }),
          task.tools && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h5", { className: "font-semibold text-green-800 mb-2", children: "Tools Needed:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1 text-sm", children: task.tools.map((tool, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(Wrench, { className: "w-4 h-4 text-green-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { className: "text-amber-800 dark:text-slate-300", children: tool })
            ] }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-900 dark:text-blue-200", children: [
          /* @__PURE__ */ jsx("strong", { children: "When to call a pro:" }),
          " ",
          task.whenToCall
        ] }) })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-yellow-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-yellow-800", children: "Proceed with Caution" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: riskyItems.map((task, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-2 border-yellow-300", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-2", children: task.name }),
        /* @__PURE__ */ jsx("p", { className: "text-amber-700 dark:text-slate-400 mb-4", children: task.description }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-4", children: [
          /* @__PURE__ */ jsxs("h5", { className: "font-semibold text-yellow-900 dark:text-yellow-200 mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4" }),
            "Critical Safety Information:"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-1 text-sm", children: task.safety.map((tip, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-yellow-600", children: "⚠" }),
            /* @__PURE__ */ jsx("span", { className: "text-yellow-900 dark:text-yellow-200", children: tip })
          ] }, i)) })
        ] }),
        task.tools && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-semibold text-amber-900 dark:text-slate-100 mb-2", children: "Required Equipment:" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 dark:text-slate-400", children: task.tools.join(", ") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-red-900 dark:text-red-200", children: [
          /* @__PURE__ */ jsx("strong", { children: "When to call a pro:" }),
          " ",
          task.whenToCall
        ] }) })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-red-600 dark:text-red-400" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-red-800", children: "Professional Only - Do Not Attempt" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: proItems.map((task, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-2 border-red-300", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-2", children: task.name }),
        /* @__PURE__ */ jsx("p", { className: "text-amber-700 dark:text-slate-400 mb-4", children: task.description }),
        /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs("h5", { className: "font-semibold text-red-900 dark:text-red-200 mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
            "Why This Must Be Done By Professionals:"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: task.safety.map((reason, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-400 text-lg", children: "⛔" }),
            /* @__PURE__ */ jsx("span", { className: "text-red-900 dark:text-red-200", children: reason })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-900 dark:text-blue-200", children: [
          /* @__PURE__ */ jsx("strong", { children: "What to do:" }),
          " ",
          task.whenToCall
        ] }) })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gradient-to-br from-amber-800 to-yellow-700 text-white rounded-2xl p-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Still Not Sure? Ask a Pro" }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-100 mb-6", children: "If you're uncertain whether a task is safe for DIY, err on the side of caution. Free consultations are always available - we'd rather answer your question than see you get hurt." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:+14028123294",
            className: "block w-full px-6 py-4 bg-white dark:bg-slate-800 text-amber-900 dark:text-slate-100 rounded-xl font-bold hover:bg-amber-50 dark:bg-slate-700/50 transition-colors text-center",
            children: [
              "📞 Call Andrew: (402) 812-3294",
              /* @__PURE__ */ jsx("div", { className: "text-sm font-normal text-amber-700 dark:text-slate-400 mt-1", children: "Free advice, no obligation" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:andrew@midwestroots.info?subject=Question%20About%20Tree%20Work%20-%20DIY%20vs%20Pro",
            className: "block w-full px-6 py-3 bg-amber-900 text-white rounded-xl font-semibold hover:bg-amber-800 transition-colors text-center",
            children: "📧 Email Your Question"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://www.google.com/search?q=tree+removal+omaha",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block w-full px-6 py-3 bg-amber-700 text-white rounded-xl font-semibold hover:bg-amber-600 dark:bg-slate-600 transition-colors text-center text-sm",
            children: "🔍 Compare Tree Service Pros"
          }
        )
      ] })
    ] })
  ] });
}
const ailments = [
  {
    name: "Emerald Ash Borer (EAB)",
    type: "pest",
    severity: "critical",
    symptoms: [
      "D-shaped exit holes in bark (1/8 inch)",
      "S-shaped larvae galleries under bark",
      "Canopy thinning starting at top",
      "Epicormic shoots (water sprouts) on trunk",
      "Woodpecker activity (birds feeding on larvae)",
      "Bark splitting and cracking"
    ],
    affectedSpecies: ["All ash species (Fraxinus)"],
    treatment: "Trunk injection treatments every 2 years ($10-15 per diameter inch). Treatment must start BEFORE infestation for best results. Once heavily infested, removal is typically more cost-effective.",
    prevention: "Preventive treatments for valuable ash trees. Do not move firewood - EAB spreads through infected wood transport.",
    timing: "Treatments must be applied in spring (May-June) when trees are actively growing"
  },
  {
    name: "Oak Wilt",
    type: "disease",
    severity: "critical",
    symptoms: [
      "Rapid leaf browning from top down (red oaks)",
      "Leaves turn brown but stay attached",
      "Fungal mats under bark (sweet smell)",
      "Wilting occurs in just 2-4 weeks",
      "Progressive crown thinning",
      "Vascular discoloration visible in sapwood"
    ],
    affectedSpecies: ["Red Oak (highly susceptible)", "Bur Oak (moderately resistant)", "White Oak (resistant)"],
    treatment: "No cure once infected. Immediately remove infected trees and sever root grafts to prevent spread. Fungicide injections can protect high-value uninfected trees nearby.",
    prevention: "NEVER prune oaks April-July (insect transmission season). Paint ALL pruning wounds immediately, even in dormant season. Remove infected trees promptly.",
    timing: "If tree shows symptoms, removal should be immediate (within days) to prevent spread"
  },
  {
    name: "Dutch Elm Disease",
    type: "disease",
    severity: "critical",
    symptoms: [
      "Wilting and yellowing of leaves on individual branches",
      "Brown streaking in sapwood",
      "Leaf drop on affected branches",
      "Progressive crown decline",
      "Branches die from tip backwards",
      "Symptoms appear mid-summer"
    ],
    affectedSpecies: ["American Elm (susceptible)", "Red Elm (susceptible)", "Disease-resistant cultivars (Valley Forge, Princeton)"],
    treatment: "Remove infected trees immediately. Fungicide injections can protect valuable uninfected trees. Root graft disruption may protect nearby trees.",
    prevention: "Plant disease-resistant elm varieties. Remove dead/dying elms promptly. Control elm bark beetles that spread the disease.",
    timing: "Symptoms appear June-August. Immediate removal critical to prevent spread"
  },
  {
    name: "Iron Chlorosis",
    type: "environmental",
    severity: "moderate",
    symptoms: [
      "Yellowing leaves with green veins",
      "New growth most affected",
      "Leaf margins turn brown and crispy",
      "Stunted growth",
      "Twig die-back in severe cases",
      "Overall tree decline over years"
    ],
    affectedSpecies: ["Pin Oak (very susceptible)", "River Birch", "Red Maple", "Some other species on alkaline soil"],
    treatment: "Trunk injections with chelated iron (Fe-EDDHA) in spring. Soil acidification treatments. Deep root fertilization. May require annual treatment.",
    prevention: "Plant species adapted to alkaline soils (Bur Oak instead of Pin Oak). Avoid overwatering which makes chlorosis worse. Maintain proper mulching.",
    timing: "Symptoms appear in spring on new growth. Treat in early spring before leaf-out"
  },
  {
    name: "Fire Blight",
    type: "disease",
    severity: "serious",
    symptoms: [
      "Sudden browning of shoots and branches",
      `Branches curve into "shepherd's crook" shape`,
      "Bark appears water-soaked then darkens",
      "Oozing bacterial exudate (looks sticky)",
      "Leaves remain attached but dead",
      "Rapid spread during wet spring weather"
    ],
    affectedSpecies: ["Crabapple", "Apple", "Pear", "Mountain Ash", "Hawthorn"],
    treatment: "Prune infected branches 12 inches below visible symptoms. Disinfect tools between cuts. Antibiotic sprays during bloom period (professional application).",
    prevention: "Choose resistant varieties. Avoid excessive nitrogen fertilizer. Prune only when dry. Remove all infected material immediately.",
    timing: "Disease most active in warm, wet spring weather. Prune infected branches appear"
  },
  {
    name: "Apple Scab",
    type: "disease",
    severity: "moderate",
    symptoms: [
      "Olive-green to brown spots on leaves",
      "Early leaf drop (defoliation)",
      "Scabby lesions on fruits",
      "Twig lesions in severe cases",
      "Repeated yearly infections weaken tree",
      "Worse in cool, wet springs"
    ],
    affectedSpecies: ["Crabapple (most common)", "Apple"],
    treatment: "Fungicide sprays starting at bud break (professional application best). Rake and destroy fallen leaves. Not life-threatening but unsightly.",
    prevention: "Plant resistant varieties (many excellent disease-resistant crabapples available). Ensure good air circulation through proper pruning.",
    timing: "Preventive sprays needed in early spring. Cultural controls year-round"
  },
  {
    name: "Bagworms",
    type: "pest",
    severity: "serious",
    symptoms: [
      "Cone-shaped bags (1-2 inches) hanging on branches",
      "Needle/leaf loss around bags",
      "Severe defoliation possible",
      "Bags most visible in winter",
      "Young larvae (June) feed actively",
      "Can kill evergreens if left untreated"
    ],
    affectedSpecies: ["Arborvitae", "Juniper", "Spruce", "Pine", "Sometimes deciduous trees"],
    treatment: "Hand-pick and destroy bags in fall/winter. Insecticide spray in early June when larvae are young and vulnerable. Bt (Bacillus thuringiensis) is organic option.",
    prevention: "Regular monitoring. Remove all bags before they release eggs in spring. Natural predators help but not always sufficient.",
    timing: "Hand removal: Fall through spring. Spray treatment: Early June when larvae are small"
  },
  {
    name: "Drought Stress",
    type: "environmental",
    severity: "moderate",
    symptoms: [
      "Wilting or drooping leaves",
      "Leaf scorch (brown leaf edges)",
      "Early fall color and leaf drop",
      "Twig die-back",
      "Cracks in soil around tree",
      "Reduced growth",
      "Long-term: increased susceptibility to pests/disease"
    ],
    affectedSpecies: ["All species, especially newly planted trees and shallow-rooted species"],
    treatment: "Deep watering (12-18 inches) slowly over several hours. Water drip line area, not just trunk. Mulch to retain moisture. May take months to recover.",
    prevention: 'Proper watering schedule (1-1.5" per week). Mulch ring 2-4" deep. Water deeply but infrequently to encourage deep roots. Avoid grass competition.',
    timing: "Water during extended dry periods, especially for trees planted within last 2 years"
  },
  {
    name: "Winter Damage & Frost Cracks",
    type: "environmental",
    severity: "moderate",
    symptoms: [
      "Vertical cracks in bark (southwest side most common)",
      "Bark splitting and peeling",
      "Branch die-back after harsh winters",
      "Dead buds that don't leaf out in spring",
      "Browning of evergreen needles",
      "Ice storm breakage"
    ],
    affectedSpecies: ["Thin-barked trees (maple, willow, fruit trees)", "Evergreens (winter burn)", "Trees with weak structure"],
    treatment: "Prune dead and damaged branches. Do NOT paint or fill cracks - trees heal naturally. Monitor for secondary pest/disease problems. Remove severely damaged trees.",
    prevention: "Young tree trunk wrapping (November-March). Proper watering in fall. Structural pruning to prevent storm damage. Anti-desiccant spray for evergreens.",
    timing: "Damage assessment in early spring. Corrective pruning in late winter/early spring"
  },
  {
    name: "Verticillium Wilt",
    type: "disease",
    severity: "serious",
    symptoms: [
      "Wilting on one side or scattered branches",
      "Yellowing leaves that may turn brown",
      "Green streaking in sapwood",
      "Progressive branch dieback",
      "Symptoms worsen in hot weather",
      "Can be confused with drought stress"
    ],
    affectedSpecies: ["Maple (especially Norway)", "Ash", "Redbud", "Smoke tree", "Lilac"],
    treatment: "No cure. Prune dead branches. Fertilize and water to support tree. Severely infected trees should be removed. Soil fungus persists for years.",
    prevention: "Avoid planting susceptible species in infected soil. Plant resistant varieties. Maintain tree vigor through proper care.",
    timing: "Symptoms appear in summer heat. Remove infected trees to prevent soil contamination"
  },
  {
    name: "Girdling Roots",
    type: "environmental",
    severity: "serious",
    symptoms: [
      "Gradual decline over years",
      "One-sided canopy thinning",
      "Trunk appears flattened or has indentations",
      "Early fall color",
      "Reduced vigor and growth",
      "Trunk does not flare properly at base",
      "Tree planted too deep initially"
    ],
    affectedSpecies: ["Lindens", "Maples", "Many nursery-grown trees"],
    treatment: "Expose and cut girdling roots (professional arborist recommended). Remove excess soil if tree was planted too deep. May improve tree condition but damage is often irreversible.",
    prevention: "Proper planting depth (root flare visible). Choose field-grown over container trees when possible. Inspect root ball before planting.",
    timing: "Can be corrected any time, but spring/fall preferred. Earlier detection = better outcomes"
  }
];
function CommonAilments() {
  const [selectedAilment, setSelectedAilment] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const filteredAilments = filterType === "all" ? ailments : ailments.filter((a) => a.type === filterType);
  const getTypeIcon = (type) => {
    switch (type) {
      case "pest":
        return Bug;
      case "disease":
        return AlertCircle;
      case "environmental":
        return ThermometerSun;
      default:
        return AlertCircle;
    }
  };
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      case "serious":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };
  const getTypeColor = (type) => {
    switch (type) {
      case "pest":
        return "bg-purple-100 text-purple-700";
      case "disease":
        return "bg-red-100 text-red-700";
      case "environmental":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Common Tree Problems" }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-slate-300 leading-relaxed", children: "Identify common diseases, pests, and environmental issues affecting trees in the Omaha area. Early detection is key to successful treatment." })
    ] }),
    !selectedAilment && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-6", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilterType("all"),
          className: `px-6 py-2 rounded-lg font-semibold transition-all ${filterType === "all" ? "bg-amber-600 dark:bg-slate-600 text-white" : "bg-white dark:bg-slate-800 text-amber-800 dark:text-slate-300 border-2 border-amber- dark:border-slate-200 dark:border-slate-600 hover:border-amber-400"}`,
          children: "All Problems"
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setFilterType("pest"),
          className: `px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${filterType === "pest" ? "bg-purple-600 text-white" : "bg-white dark:bg-slate-800 text-purple-800 border-2 border-purple-200 hover:border-purple-400"}`,
          children: [
            /* @__PURE__ */ jsx(Bug, { className: "w-4 h-4" }),
            "Pests"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setFilterType("disease"),
          className: `px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${filterType === "disease" ? "bg-red-600 text-white" : "bg-white dark:bg-slate-800 text-red-800 border-2 border-red-200 hover:border-red-400"}`,
          children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4" }),
            "Diseases"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setFilterType("environmental"),
          className: `px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${filterType === "environmental" ? "bg-blue-600 dark:bg-blue-600 text-white" : "bg-white dark:bg-slate-800 text-blue-800 border-2 border-blue-200 hover:border-blue-400"}`,
          children: [
            /* @__PURE__ */ jsx(ThermometerSun, { className: "w-4 h-4" }),
            "Environmental"
          ]
        }
      )
    ] }),
    !selectedAilment && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filteredAilments.map((ailment, index) => {
      const TypeIcon = getTypeIcon(ailment.type);
      return /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedAilment(ailment),
          className: "w-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all p-5 text-left group",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2 flex-wrap", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 group-hover:text-amber-700 dark:text-slate-400 transition-colors", children: ailment.name }),
                /* @__PURE__ */ jsxs("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(ailment.type)}`, children: [
                  /* @__PURE__ */ jsx(TypeIcon, { className: "w-3 h-3 inline mr-1" }),
                  ailment.type
                ] }),
                /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold border-2 ${getSeverityColor(ailment.severity)}`, children: ailment.severity })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-amber-700 dark:text-slate-400", children: [
                "Affects: ",
                ailment.affectedSpecies.join(", ")
              ] })
            ] }),
            /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-amber-600 transform group-hover:translate-x-1 transition-transform flex-shrink-0 ml-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ] })
        },
        index
      );
    }) }),
    selectedAilment && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in", children: [
      /* @__PURE__ */ jsx("div", { className: `bg-gradient-to-r ${selectedAilment.severity === "critical" ? "from-red-600 to-red-800" : selectedAilment.severity === "serious" ? "from-orange-600 to-orange-800" : "from-yellow-600 to-yellow-800"} text-white p-6`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-2", children: selectedAilment.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsx("span", { className: `px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(selectedAilment.type)}`, children: selectedAilment.type }),
            /* @__PURE__ */ jsxs("span", { className: "text-white/90", children: [
              "Severity: ",
              /* @__PURE__ */ jsx("strong", { children: selectedAilment.severity })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedAilment(null),
            className: "text-white/80 hover:text-white transition-colors",
            children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-amber-900 dark:text-slate-100 mb-2", children: "Affected Species:" }),
          /* @__PURE__ */ jsx("p", { className: "text-amber-800 dark:text-slate-300", children: selectedAilment.affectedSpecies.join(", ") })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
            "Symptoms to Look For"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selectedAilment.symptoms.map((symptom, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-amber-800 dark:text-slate-300", children: [
            /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-400 mt-1", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: symptom })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-green-50 dark:bg-emerald-900/20 border-2 border-green-200 rounded-xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-green-900 dark:text-emerald-200 mb-3", children: "Treatment Options" }),
          /* @__PURE__ */ jsx("p", { className: "text-green-900 dark:text-emerald-200 leading-relaxed", children: selectedAilment.treatment })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-blue-900 dark:text-blue-200 mb-3", children: "Prevention" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-900 dark:text-blue-200 leading-relaxed", children: selectedAilment.prevention })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 dark:bg-slate-700/50 border-2 border-amber- dark:border-slate-200 dark:border-slate-600 rounded-xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-amber-900 dark:text-slate-100 mb-3", children: "Timing is Critical" }),
          /* @__PURE__ */ jsx("p", { className: "text-amber-900 dark:text-slate-100 leading-relaxed", children: selectedAilment.timing })
        ] }),
        selectedAilment.severity === "critical" || selectedAilment.severity === "serious" ? /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-red-900 dark:text-red-200 mb-4 text-center", children: "⚠️ This Issue Requires Professional Help" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+14028123294",
                className: "block w-full px-6 py-4 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-bold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center",
                children: [
                  "📞 Call for Urgent Consultation",
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-normal text-green-100 mt-1", children: "(402) 812-3294 - Available 24/7" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:andrew@midwestroots.info?subject=Urgent%20-%20Tree%20Disease/Pest%20from%20Diagnostic%20Tool&body=I%20think%20my%20tree%20has:%20[AILMENT]%0A%0ASymptoms%20I'm%20seeing:%20%0A%0AMy%20address:%20%0ABest%20phone%20to%20reach%20me:%20",
                className: "block w-full px-6 py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center",
                children: "📧 Email with Photos of Your Tree"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.google.com/search?q=tree+removal+omaha",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center text-sm",
                children: "🔍 Find Other Certified Arborists"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-blue-900 dark:text-blue-200 mb-3 text-center", children: "Questions About Treatment?" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:andrew@midwestroots.info?subject=Question%20About%20Tree%20Health%20from%20Diagnostic%20Tool",
                className: "block w-full px-6 py-3 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center",
                children: "📧 Get Expert Advice"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+14028123294",
                className: "block w-full px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center text-sm",
                children: "📞 (402) 812-3294"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    !selectedAilment && /* @__PURE__ */ jsx("div", { className: "mt-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxs("div", { className: "text-blue-900 dark:text-blue-200", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold mb-2", children: "When in Doubt, Get Expert Help" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", children: "Accurate diagnosis is critical for effective treatment. Misidentifying a problem can waste money and time while the real issue gets worse. Professional arborists have the training and experience to correctly identify problems and recommend the most effective solutions." })
      ] })
    ] }) })
  ] });
}
function TreeDiagnostic() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);
  const goHome = () => setCurrentScreen("home");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-gradient-to-r from-amber-900 to-yellow-700 dark:from-slate-800 dark:to-slate-900 text-white shadow-lg sticky top-0 z-50 transition-colors duration-300", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      currentScreen !== "home" && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: goHome,
          className: "flex items-center gap-2 text-white/90 hover:text-white transition-colors",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: currentScreen === "home" ? "mx-auto text-center" : "flex-1 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-3xl font-bold tracking-tight", children: "Omaha Tree Care Guide" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-100 dark:text-slate-300 mt-1", children: "Expert tree care knowledge, free for homeowners" })
      ] }),
      currentScreen !== "home" ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setDarkMode(!darkMode),
          className: "p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors",
          "aria-label": "Toggle dark mode",
          children: darkMode ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" })
        }
      ) }) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setDarkMode(!darkMode),
          className: "p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors",
          "aria-label": "Toggle dark mode",
          children: darkMode ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-6 md:py-8", children: [
      currentScreen === "home" && /* @__PURE__ */ jsx(Home, { setScreen: setCurrentScreen }),
      currentScreen === "species" && /* @__PURE__ */ jsx(SpeciesIdentifier, {}),
      currentScreen === "hazard" && /* @__PURE__ */ jsx(HazardAssessment, {}),
      currentScreen === "cost" && /* @__PURE__ */ jsx(CostEstimator, {}),
      currentScreen === "diy" && /* @__PURE__ */ jsx(DIYvsProGuide, {}),
      currentScreen === "ailments" && /* @__PURE__ */ jsx(CommonAilments, {})
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-amber-900 dark:bg-slate-900 text-white py-8 mt-12 transition-colors duration-300", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold mb-2", children: "Need Professional Tree Care?" }),
      /* @__PURE__ */ jsx("p", { className: "text-amber-200 dark:text-slate-300 mb-4", children: "Midwest Roots Tree Services - Serving Omaha & Surrounding Areas" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-6", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "tel:+14028123294",
            className: "px-6 py-3 bg-yellow-500 dark:bg-emerald-500 text-amber-900 dark:text-white rounded-lg font-bold hover:bg-yellow-400 dark:hover:bg-emerald-400 transition-colors text-lg",
            children: "📞 Call or Text: (402) 812-3294"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:andrew@midwestroots.info",
            className: "px-6 py-3 bg-amber-800 dark:bg-slate-700 text-white rounded-lg font-semibold hover:bg-amber-700 dark:hover:bg-slate-600 transition-colors",
            children: "📧 andrew@midwestroots.info"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-amber-700 dark:border-slate-700 pt-4 mt-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://midwestroots.info",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-amber-200 dark:text-slate-300 hover:text-white transition-colors text-sm",
            children: "Visit MidwestRoots.info for more about our services"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-amber-300 dark:text-slate-400 text-xs mt-2", children: "Free diagnostic tool provided as a community service" })
      ] })
    ] }) }) })
  ] });
}
const ToolsPage = () => {
  return /* @__PURE__ */ jsx(TreeDiagnostic, {});
};
function ContactForm({ urgency = "medium", pageSource = "unknown" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    bestTime: "morning"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      if (window.gtag) {
        gtag("event", "form_submission", {
          event_category: "lead_generation",
          event_label: pageSource,
          urgency
        });
      }
      const SERVICE_ID = "service_76afgoi";
      const TEMPLATE_ID = "template_8mkbzl7";
      const PUBLIC_KEY = "awhJXJQLTLlTyG8WZ";
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message: formData.message,
        best_time: formData.bestTime,
        urgency,
        page_source: pageSource,
        submission_date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
        submission_time: (/* @__PURE__ */ new Date()).toLocaleTimeString()
      };
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      console.log("EmailJS Response:", response);
      if (window.gtag) {
        gtag("event", "form_submission_success", {
          event_category: "conversion",
          event_label: pageSource,
          value: urgency === "high" ? 10 : 5
        });
      }
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
          bestTime: "morning"
        });
      }, 3e3);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      if (window.gtag) {
        gtag("event", "form_submission_error", {
          event_category: "error",
          event_label: error.message
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitStatus === "success") {
    return /* @__PURE__ */ jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-8 text-center", children: [
      /* @__PURE__ */ jsx(CheckCircle, { className: "w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-green-900 dark:text-green-200 mb-2", children: "Message Received!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-green-800 dark:text-green-300 mb-4", children: [
        "Thanks for reaching out. I'll get back to you ",
        urgency === "high" ? "within 2 hours" : "within 24 hours",
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700 dark:text-green-400", children: "Check your email for a confirmation." })
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    submitStatus === "error" && /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-red-900 dark:text-red-200", children: "Submission Failed" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-red-800 dark:text-red-300", children: "Please try calling instead: (402) 812-3294" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "name",
          className: "block text-sm font-semibold text-slate-300 mb-2",
          children: "Your Name *"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "name",
          name: "name",
          value: formData.name,
          onChange: handleChange,
          required: true,
          className: "w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition",
          placeholder: "John Smith"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-semibold text-slate-300 mb-2",
          children: "Email Address *"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          id: "email",
          name: "email",
          value: formData.email,
          onChange: handleChange,
          required: true,
          className: "w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition",
          placeholder: "john@example.com"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "phone",
          className: "block text-sm font-semibold text-slate-300 mb-2",
          children: "Phone Number *"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "tel",
          id: "phone",
          name: "phone",
          value: formData.phone,
          onChange: handleChange,
          required: true,
          className: "w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition",
          placeholder: "(402) 555-1234"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "address",
          className: "block text-sm font-semibold text-slate-300 mb-2",
          children: "Property Address (City is fine)"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "address",
          name: "address",
          value: formData.address,
          onChange: handleChange,
          className: "w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition",
          placeholder: "Omaha, NE or full address"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "bestTime",
          className: "block text-sm font-semibold text-slate-300 mb-2",
          children: "Best Time to Call You Back"
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          id: "bestTime",
          name: "bestTime",
          value: formData.bestTime,
          onChange: handleChange,
          className: "w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition",
          children: [
            /* @__PURE__ */ jsx("option", { value: "morning", children: "Morning (8am-12pm)" }),
            /* @__PURE__ */ jsx("option", { value: "afternoon", children: "Afternoon (12pm-5pm)" }),
            /* @__PURE__ */ jsx("option", { value: "evening", children: "Evening (5pm-7pm)" }),
            /* @__PURE__ */ jsx("option", { value: "anytime", children: "Anytime" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "message",
          className: "block text-sm font-semibold text-slate-300 mb-2",
          children: "Tell Me About Your Tree Situation"
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "message",
          name: "message",
          value: formData.message,
          onChange: handleChange,
          rows: "4",
          className: "w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none",
          placeholder: "Describe your tree concern, location of tree relative to structures, any visible damage, etc."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: "w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2",
        children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }),
          "Sending..."
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" }),
          "Send Message"
        ] })
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 text-center", children: urgency === "high" ? "I'll respond within 2 hours during business hours" : "I'll get back to you within 24 hours" })
  ] });
}
function EmergencyTreeService() {
  const [searchParams] = useSearchParams();
  const riskLevel = searchParams.get("risk");
  useEffect(() => {
    document.title = "Emergency Tree Service Omaha - Immediate Risk Response | Midwest Roots";
    if (window.gtag) {
      gtag("event", "page_view", {
        page_title: "Emergency Tree Service",
        page_location: window.location.href,
        risk_level: riskLevel
      });
    }
  }, [riskLevel]);
  const handlePhoneClick = () => {
    if (window.gtag) {
      gtag("event", "phone_click", {
        event_category: "engagement",
        event_label: "emergency_page",
        risk_level: riskLevel
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-900", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-800 border-b border-slate-700", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 py-4", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/tools",
        className: "inline-flex items-center text-slate-300 hover:text-white transition",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to Diagnostic Tools"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-16 pb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        riskLevel && /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6 font-semibold", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          "HIGH RISK DETECTED - Priority Response Available"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-6 leading-tight", children: [
          "Emergency Tree Service",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "Omaha Metro" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-300 mb-8", children: "Your hazard assessment indicated immediate action needed. I'm standing by to help protect your property." }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6 max-w-6xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-8 h-8 text-emerald-400 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Call or Text Andrew Now" }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg", children: "Available 24/7 for urgent tree emergencies" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:4028123294",
                  onClick: handlePhoneClick,
                  className: "block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-xl text-center text-2xl mb-4 transition transform hover:scale-105",
                  children: "(402) 812-3294"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-sm text-slate-400", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("strong", { className: "text-slate-300", children: "Response time:" }),
                  " If voicemail, expect callback within 2 hours during business hours (8am-6pm), or first thing next morning after hours. Your safety is my priority."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: "Common Emergency Situations We Handle" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border-l-4 border-red-500 rounded-lg p-6", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2", children: "Trees Leaning Toward Structures" }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: "Sudden lean after storms, especially in Omaha's clay soil, can indicate root failure. Quick assessment prevents property damage." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border-l-4 border-orange-500 rounded-lg p-6", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2", children: 'Large Dead Branches ("Widow Makers")' }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: "Dead limbs over driveways, roofs, or high-traffic areas are ticking time bombs. Ice and wind can cause sudden failure." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border-l-4 border-yellow-500 rounded-lg p-6", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2", children: "Storm Damage & Split Trunks" }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: "Omaha ice storms create massive loads on branches. Split trunks and hanging limbs need immediate removal before they fall." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border-l-4 border-emerald-500 rounded-lg p-6", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white mb-2", children: "EAB-Infested Ash Trees" }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: "Emerald Ash Borer weakens ash trees to the point of sudden failure. Dead or dying ash trees near structures require urgent removal." })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-2xl p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "Or Request a Callback" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-6", children: "I'll call you back within 2 hours (business hours) to discuss your tree emergency." }),
            /* @__PURE__ */ jsx(ContactForm, { urgency: "high", pageSource: "emergency_tree_service" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-800 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-8 text-center", children: "Why Omaha Homeowners Trust Midwest Roots" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Honest Assessment" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "I'll never recommend unnecessary work. If your tree can be saved, I'll tell you how. If it needs removal, you'll know why." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Local Expertise" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Based in Omaha, I understand our unique challenges: ice storms, wind shear, EAB, and alkaline soil affecting tree health." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "ISA Standards" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "All assessments follow International Society of Arboriculture guidelines for tree risk evaluation and safety." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Emergency Tree Removal",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Midwest Roots Tree Care",
        "telephone": "(402) 812-3294",
        "areaServed": {
          "@type": "City",
          "name": "Omaha",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "NE",
            "addressCountry": "US"
          }
        }
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "servicePhone": {
          "@type": "ContactPoint",
          "telephone": "+1-402-812-3294",
          "contactType": "Emergency Service",
          "availableLanguage": "English",
          "hoursAvailable": "24/7 phone availability"
        }
      }
    }) })
  ] });
}
function TreeConsultation() {
  const [searchParams] = useSearchParams();
  const riskLevel = searchParams.get("risk");
  useEffect(() => {
    document.title = "Tree Consultation Omaha - Professional Assessment Before DIY | Midwest Roots";
    if (window.gtag) {
      gtag("event", "page_view", {
        page_title: "Tree Consultation",
        page_location: window.location.href,
        risk_level: riskLevel
      });
    }
  }, [riskLevel]);
  const handlePhoneClick = () => {
    if (window.gtag) {
      gtag("event", "phone_click", {
        event_category: "engagement",
        event_label: "consultation_page",
        risk_level: riskLevel
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-900", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-800 border-b border-slate-700", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 py-4", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/tools",
        className: "inline-flex items-center text-slate-300 hover:text-white transition",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to Diagnostic Tools"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-16 pb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-yellow-900/10 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        riskLevel && /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-yellow-600 text-slate-900 px-4 py-2 rounded-full mb-6 font-semibold", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
          "MODERATE RISK - Professional Consultation Recommended"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-6 leading-tight", children: [
          "Get a Professional Look",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "Before You DIY" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-300 mb-8", children: "Your assessment shows some concerns that warrant a closer look. Let me give you an honest opinion before you invest time or money." }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6 max-w-6xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-8 h-8 text-emerald-400 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Talk to Andrew - Free Consultation" }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg", children: "Quick phone call to discuss your tree situation" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:4028123294",
                  onClick: handlePhoneClick,
                  className: "block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-xl text-center text-2xl mb-4 transition transform hover:scale-105",
                  children: "(402) 812-3294"
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-slate-300", children: "Best times to call:" }),
                " Mon-Sat 8am-6pm. I'll walk you through what to look for and whether you need professional help."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-6", children: "DIY-Friendly vs Call a Professional" }),
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-green-600/50 rounded-xl p-6 mb-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-green-400 mb-4", children: "Often DIY-Friendly:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Small branches (under 3 inches diameter)" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Work that doesn't require ladders or climbing" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Clear of power lines, structures, and obstacles" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-green-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Routine pruning on young, healthy trees" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-red-600/50 rounded-xl p-6 mb-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-red-400 mb-4", children: "Call a Professional:" }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-red-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Any work near power lines" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-red-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Trees/branches leaning toward structures" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-red-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Large branches (over 6 inches diameter)" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-red-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Any tree removal or stump grinding" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-red-400 flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: "Dead, diseased, or compromised trees" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-4", children: /* @__PURE__ */ jsxs("p", { className: "text-yellow-200 text-sm", children: [
                /* @__PURE__ */ jsx("strong", { children: "Not sure which category fits?" }),
                " A quick call can save you from injury or expensive mistakes."
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-2xl p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "Or Request a Callback" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-6", children: "Leave your details and I'll reach out within 24 hours to schedule a time that works for you." }),
            /* @__PURE__ */ jsx(ContactForm, { urgency: "medium", pageSource: "tree_consultation" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-800 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-8 text-center", children: "Why Get a Professional Opinion First?" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(Shield, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Safety First" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Tree work is one of the most dangerous DIY projects. A quick assessment can identify hidden risks like powerlines, weak unions, or rot you can't see." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Save Money" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Sometimes DIY is the right call, sometimes it's not. I'll give you an honest assessment so you don't waste money on the wrong approach." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Local Expertise" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Omaha trees face unique challenges: ice storms, EAB, alkaline soil, wind shear. I know what to look for and how to handle it safely." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "No Pressure" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "If your tree is healthy or you can handle it yourself, I'll tell you. My goal is to help you make the right decision, not sell you services you don't need." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Tree Consultation",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Midwest Roots Tree Care",
        "telephone": "(402) 812-3294",
        "areaServed": {
          "@type": "City",
          "name": "Omaha",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "NE",
            "addressCountry": "US"
          }
        }
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free consultation phone call"
      }
    }) })
  ] });
}
const omaha = ["dundee", "benson", "florence", "midtown", "aksarben", "westside", "north-omaha", "south-omaha"];
const millard = ["old-millard", "harvey-oaks", "oak-hills", "millard-highlands"];
const elkhorn = ["the-ridges", "pacific-springs", "skyline-ranches", "indian-creek"];
const gretna = ["tiburon", "aspen-creek", "buffalo-creek"];
const ralston = ["mockingbird-hills"];
const papillion = ["shadow-lake", "eagle-hills"];
const bellevue = ["fontenelle-hills"];
const bennington = ["newport-landing"];
const locationsData = {
  omaha,
  millard,
  elkhorn,
  gretna,
  ralston,
  papillion,
  bellevue,
  bennington
};
function CityHub() {
  const { city } = useParams();
  const formatName = (str) => {
    if (!str) return "";
    return str.split("-").map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };
  const cityName = formatName(city);
  const neighborhoods = locationsData[city] || [];
  const pageTitle = `Tree Service ${cityName} NE - All Neighborhoods | Midwest Roots Tree Care`;
  const metaDescription = `Expert tree service in ${cityName}, Nebraska. Serving ${neighborhoods.length} neighborhoods. Free diagnostic tool. Call (402) 812-3294`;
  useEffect(() => {
    if (window.gtag) {
      gtag("event", "page_view", {
        page_title: `${cityName} Tree Care Hub`,
        page_location: window.location.href,
        city: cityName
      });
    }
  }, [city, cityName]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-900", children: [
    /* @__PURE__ */ jsxs(Head, { prioritizeSeoTags: true, children: [
      /* @__PURE__ */ jsx("title", { children: pageTitle }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `https://omahatreecare.com/locations/${city}` })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-slate-800 border-b border-slate-700", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 py-4", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center text-slate-300 hover:text-white transition",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to Home"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-16 pb-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full mb-6 font-semibold", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }),
          "Serving ",
          cityName,
          ", Nebraska"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-6 leading-tight", children: [
          "Tree Care in ",
          cityName,
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "All Neighborhoods" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-slate-300 mb-8 max-w-2xl", children: [
          "Professional tree service for all ",
          cityName,
          " neighborhoods. Select your area below for neighborhood-specific information, or use our free diagnostic tool."
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/tools",
            className: "inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition transform hover:scale-105",
            children: [
              /* @__PURE__ */ jsx(TreeDeciduous, { className: "w-5 h-5" }),
              "Start Free Tree Assessment"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-800 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-white mb-8", children: [
        cityName,
        " Neighborhoods We Serve"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl", children: neighborhoods.map((neighborhood) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/locations/${city}/${neighborhood}`,
          className: "bg-slate-900 border border-slate-700 hover:border-emerald-500 rounded-lg p-6 transition group",
          children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white group-hover:text-emerald-400 transition", children: formatName(neighborhood) }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-sm mt-2", children: [
              "Tree service in ",
              formatName(neighborhood),
              " →"
            ] })
          ]
        },
        neighborhood
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-900 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-white mb-4", children: [
        "Serving All of ",
        cityName
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl text-slate-300 mb-8 max-w-2xl mx-auto", children: [
        "Not seeing your neighborhood? We serve the entire ",
        cityName,
        " area. Call Andrew for a free consultation."
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "tel:4028123294",
          className: "inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-10 rounded-xl text-2xl transition transform hover:scale-105",
          children: "(402) 812-3294"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Tree Care",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Midwest Roots Tree Care",
        "telephone": "(402) 812-3294",
        "email": "andrew@omahatreecare.com"
      },
      "areaServed": neighborhoods.map((n) => ({
        "@type": "Place",
        "name": formatName(n),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": "NE"
        }
      })),
      "url": `https://omahatreecare.com/locations/${city}`
    }) })
  ] });
}
const neighborhoodData = {
  dundee: { specificRisk: "Historic tree preservation and mature oak care" },
  millard: { specificRisk: "Emerald Ash Borer mitigation" },
  tiburon: { specificRisk: "New construction tree damage and soil compaction" }
  // Add more as needed
};
function LocationTemplate() {
  const { city, neighborhood } = useParams();
  const formatName = (str) => {
    if (!str) return "";
    return str.split("-").map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };
  const cityName = formatName(city);
  const neighborhoodName = formatName(neighborhood);
  const specificData = neighborhoodData[neighborhood] || { specificRisk: "Tree health and storm damage assessment" };
  const pageTitle = `Tree Service ${neighborhoodName}, ${cityName} NE | Midwest Roots Tree Care`;
  const metaDescription = `Expert tree service in ${neighborhoodName}, ${cityName}. ${specificData.specificRisk}. Free diagnostic tool. Call (402) 812-3294`;
  useEffect(() => {
    if (window.gtag) {
      gtag("event", "page_view", {
        page_title: `${neighborhoodName} ${cityName} Tree Care`,
        page_location: window.location.href,
        city: cityName,
        neighborhood: neighborhoodName
      });
    }
  }, [city, neighborhood, cityName, neighborhoodName]);
  const handlePhoneClick = () => {
    if (window.gtag) {
      gtag("event", "phone_click", {
        event_category: "engagement",
        event_label: "neighborhood_page",
        city: cityName,
        neighborhood: neighborhoodName
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-900", children: [
    /* @__PURE__ */ jsxs(Head, { prioritizeSeoTags: true, children: [
      /* @__PURE__ */ jsx("title", { children: pageTitle }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `https://omahatreecare.com/locations/${city}/${neighborhood}` })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-slate-800 border-b border-slate-700", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 py-4", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/locations/${city}`,
        className: "inline-flex items-center text-slate-300 hover:text-white transition",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to ",
          cityName
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-16 pb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full mb-6 font-semibold", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }),
          "Serving ",
          neighborhoodName,
          ", ",
          cityName
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-6 leading-tight", children: [
          "Tree Care in ",
          neighborhoodName,
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("span", { className: "text-emerald-400", children: [
            cityName,
            ", Nebraska"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-slate-300 mb-8 max-w-2xl", children: [
          "Local tree service for ",
          neighborhoodName,
          " homeowners. ",
          specificData.specificRisk,
          ". Use our free diagnostic tool or call Andrew for honest recommendations."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6 max-w-6xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-8 h-8 text-emerald-400 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Call or Text Andrew" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-slate-300 text-lg", children: [
                    "Local ",
                    neighborhoodName,
                    " tree service"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:4028123294",
                  onClick: handlePhoneClick,
                  className: "block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-xl text-center text-2xl mb-4 transition transform hover:scale-105",
                  children: "(402) 812-3294"
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400", children: [
                /* @__PURE__ */ jsxs("strong", { className: "text-slate-300", children: [
                  "Serving ",
                  neighborhoodName,
                  " since 2024."
                ] }),
                " Mon-Sat 8am-6pm."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-emerald-500/50 rounded-2xl p-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
                /* @__PURE__ */ jsx(TreeDeciduous, { className: "w-8 h-8 text-emerald-400 flex-shrink-0" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Free Diagnostic Tool" }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm", children: "10-minute assessment based on ISA arborist standards." })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/tools",
                  className: "block w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold py-4 px-6 rounded-lg text-center transition border border-emerald-500/50",
                  children: "Start Free Assessment →"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-2xl p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "Request a Callback" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-6", children: "Leave your details and I'll call you back within 24 hours." }),
            /* @__PURE__ */ jsx(ContactForm, { urgency: "medium", pageSource: `${city}_${neighborhood}` })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-800 py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-white mb-8 text-center", children: [
        "Common Tree Issues in ",
        neighborhoodName
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: specificData.specificRisk }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-300", children: [
            "We understand the unique challenges facing ",
            neighborhoodName,
            " trees."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Storm Damage Assessment" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Nebraska ice storms and wind can damage trees. We help assess and prevent failures." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 border border-slate-700 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-10 h-10 text-emerald-400 mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Free Diagnostic Tool" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300", children: "Not sure if you need service? Our free tool gives honest, arborist-grade assessments." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Midwest Roots Tree Care - ${neighborhoodName}`,
      "image": "https://omahatreecare.com/images/og-image.jpg",
      "telephone": "(402) 812-3294",
      "email": "andrew@omahatreecare.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": neighborhoodName,
        "addressRegion": "NE",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Place",
        "name": neighborhoodName,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": "NE",
          "addressCountry": "US"
        }
      },
      "priceRange": "$$",
      "openingHours": "Mo-Sa 08:00-18:00",
      "url": `https://omahatreecare.com/locations/${city}/${neighborhood}`
    }) })
  ] });
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(HomePage, {}),
    entry: "src/pages/HomePage.jsx"
  },
  {
    path: "/tools",
    element: /* @__PURE__ */ jsx(ToolsPage, {}),
    entry: "src/pages/ToolsPage.jsx"
  },
  {
    path: "/emergency-tree-service-omaha",
    element: /* @__PURE__ */ jsx(EmergencyTreeService, {}),
    entry: "src/pages/EmergencyTreeService.jsx"
  },
  {
    path: "/tree-consultation-omaha",
    element: /* @__PURE__ */ jsx(TreeConsultation, {}),
    entry: "src/pages/TreeConsultation.jsx"
  },
  // Dynamic location routes
  {
    path: "/locations/:city",
    element: /* @__PURE__ */ jsx(CityHub, {}),
    entry: "src/pages/CityHub.jsx"
  },
  {
    path: "/locations/:city/:neighborhood",
    element: /* @__PURE__ */ jsx(LocationTemplate, {}),
    entry: "src/pages/LocationTemplate.jsx"
  }
];
const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient, initialState }) => {
    return ({ children }) => children;
  },
  () => {
    if (typeof window !== "undefined") {
      injectSpeedInsights();
    }
  }
);
export {
  createRoot
};
