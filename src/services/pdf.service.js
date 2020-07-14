import jsPDF from 'jspdf';
import 'jspdf-autotable'

export const pdfService = {
  createPDF,

};

function createPDF(tableReactionData, tableCatSummaryData, tableSummaryData, tableProcessData, responseTimeMean, reactionTimeMean, responseTimeMedian, reactionTimeMedian, id){

    let today = new Date();
    let year = today.getFullYear();
    year = year.toString();
    let shortyear = year.substr(2,2);
    let month = today.getMonth();
    month = parseInt(month)+ 1;
    let date = today.getDate();

    const cross = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAYAAABPeYUaAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDgAAjBIAAP6qAACD1QAAhhEAAPYBAAA7QwAAFZAbQpIlAAAXLWlDQ1BJQ0MgUHJvZmlsZQAAWMPVeXdUFEvQb89s3mUJS84555xzjpKTICw554xEEUUUFZAoBkAEBDERRQQERUVEUERFRREBRS+giIjAN6j33i+9P94575/X5/TM71RXV4eqrq6aAYB9kRoVFQbTAxAeERdjb2rA5+rmzoebAmhAC8iAGTBTfWOj9G1trcD/sXybANDOe1x6Rxb4vysMfv6xvgBAtgj28Yv1DUfwNQBgA9+omDgAUN8R+mhiXBSC0UMIZopBJojgqR0c+Bsv7WCfXxiD/sXjaG+IYDYA8DRUakwgAGQhhM6X4BuIyCEbAYClRPgFRwDA6IpgHd8gqh+yF2UIj1R4eOQOHkCwmM9/khP4X2T6/COTSg38B/9ey6+CNwqOjQqjJoP/1yU8LP7vMShIpYkIs9nRDQtS5/2oRpbImwupW1Fhv3SG8EAc/hFODn+wVISPza4/WCcgxsT+d1/INirOYAcj64MCouJsHf/Q01OCDG12xkFwsX+s8d9yzoRQLXZ0RovgKzHx9k4IRvYA6o1NcDBGMGJR0LuUIEeXPzxf/fyN/tBhOCDYxPwPpgTHme+MxYRggdBIS/vfY8EqwBKEAX8QD2KQZwSQBlbAEBj9eUqDAEBFWhKQtlgQCt4jOBzpEYn0iUQw3x8+w/9BMfnVLxDp918l8gFfhC/+nzH/pv4rIRj4Ie+/6dQ/bTuzi/UKzv53hP8s71dPuQtyC3I//25Hi6AV0MpoA7Q2WgetDvjQLGgOII1WQquh9dG6aE2kTR2Z5btfs/wzxx354VcCEsoikzWcg/6sweefFTj/4g7+X1f0Z+4ji+2L/8wQxPknxe0YkGFkVHJMcGBQHJ8+cnL9pfjMI3xlpPgU5OQVwP9PZcdn/UZf7H/5Iojl4b+0kFQAVHkR4q1/af4TAHS9RI4p8V+ayH7EVBH/cdfbNz4m4Tdtx50ADCACOsRC2QEPEARiyD4rABWgCfSAMbAAu4AjcAN7kN0OQmwwBiSCvSAL5IJ8cAycABXgNKgB9aAZXAHtoBv0gdvgPhgFT8ALMA1mwUewBL6BDQiCcBAZYoTYIV5IGJKEFCA1SAcyhqwge8gN8oYCoQgoHtoL7YPyoUKoAjoLNUCXoU6oD7oLPYKeQW+gBWgF+gGjYBqYCeaGRWBZWA3Why1hR9gTDoSj4RQ4By6Ay+BquAlug/vg+/ATeBr+CK+iAIqEYkHxo6RRaihD1C6UOyoAFYNKRx1ClaCqURdRXag7qHHUNGoRtY7GohnRfGhpxE7N0E5oX3Q0Oh19GF2Brke3oQfQ4+g36CX0FoaM4cJIYjQw5hhXTCAmEZOLKcHUYVoxg5gnmFnMNywWy4IVxapizbBu2BBsKvYwtgrbgu3FPsLOYFdxOBw7ThKnjduFo+LicLm4clwT7iZuDDeL+44n4XnxCngTvDs+Ap+NL8E34nvwY/g5/AaBniBM0CDsIvgRkglHCbWELsJDwixhg8hAFCVqEx2JIcQsYhnxInGQOEX8QiKRBEjqJDtSMCmTVEa6RBoivSGt01BoJGgMaTxo4mkKaM7T9NI8o/lCJpNFyHpkd3IcuYDcQL5FfkX+TstIK0NrTutHm0FbSdtGO0b7mY5AJ0ynT7eHLoWuhO4q3UO6RXoCvQi9IT2VPp2+kr6T/in9KgMjgzzDLoZwhsMMjQx3GeYpOIoIxZjiR8mh1FBuUWYYUYyCjIaMvoz7GGsZBxlnmbBMokzmTCFM+UzNTCNMS8wUZiVmZ+Yk5krmG8zTLCgWERZzljCWoyxXWCZYfrBys+qz+rPmsV5kHWNdY+Nk02PzZzvE1sL2hO0HOx+7MXso+3H2dvaXHGgOCQ47jkSOUxyDHIucTJyanL6chzivcD7ngrkkuOy5UrlquIa5Vrl5uE25o7jLuW9xL/Kw8OjxhPAU8/TwLPAy8urwBvMW897k/cDHzKfPF8ZXxjfAt8TPxW/GH89/ln+Ef0NAVMBJIFugReClIFFQTTBAsFiwX3BJiFfIWmiv0AWh58IEYTXhIOFS4TvCayKiIi4iB0TaReZF2UTNRVNEL4hOiZHFdMWixarFHotjxdXEQ8WrxEclYAlliSCJSomHkrCkimSwZJXkIymMlLpUhFS11FNpGml96QTpC9JvZFhkrGSyZdplPssKybrLHpe9I7slpywXJlcr90KeIm8hny3fJb+iIKHgq1Cp8FiRrGiimKHYobisJKnkr3RKaVKZUdla+YByv/KmiqpKjMpFlQVVIVVv1ZOqT9WY1GzVDqsNqWPUDdQz1LvV1zVUNOI0rmj8pSmtGarZqDmvJarlr1WrNaMtoE3VPqs9rcOn461zRmdal1+Xqlut+1ZPUM9Pr05vTl9cP0S/Sf+zgZxBjEGrwZqhhmGaYa8RysjU6JDRiDHF2Mm4wviViYBJoMkFkyVTZdNU014zjJml2XGzp+bc5r7mDeZLFqoWaRYDljSWDpYVlm+tJKxirLqsYWsL6yLrKRthmwib9l1gl/muol0vbUVto22v22HtbO0q7d7by9vvtb/jwOjg5dDo8M3RwPGo4wsnMad4p35nOmcP5wbnNRcjl0KXaVdZ1zTX+24cbsFuHe44d2f3OvfV3ca7T+ye9VD2yPWY8BT1TPK8u4djT9ieG150XlSvq94YbxfvRu+f1F3Uauqqj7nPSZ8lX0PfUt+Pfnp+xX4L/tr+hf5zAdoBhQHzgdqBRYELQbpBJUGLwYbBFcHLIWYhp0PWQneFng/dDnMJawnHh3uHd0ZQIkIjBiJ5IpMiH0VJRuVGTUdrRJ+IXoqxjKmLhWI9YzvimJDgcDheLH5//JsEnYTKhO+JzolXkxiSIpKGkyWS85LnUkxSzqWiU31T+/fy783a+yZNP+1sOpTuk96fIZiRkzGbaZpZn0XMCs16kC2XXZj9dZ/Lvq4c7pzMnJn9pvsv5NLmxuQ+PaB54PRB9MHggyN5innleVuH/A7dy5fLL8n/edj38L0j8kfKjmwXBBSMHFU5euoY9ljEsYnjusfrCxkKUwpniqyL2or5ig8Vfz3hdeJuiVLJ6VJiaXzpdJlVWUe5UPmx8p8VQRVPKg0qW05yncw7uVblVzV2Su/UxdPcp/NP/zgTfGbyrOnZtmqR6pIabE1Czfta59o759TONdRx1OXXbZ6POD9db18/0KDa0NDI1Xj0Anwh/sJCk0fTaLNRc8dF6YtnW1ha8i+BS/GXPlz2vjxxxfJK/1W1qxevCV872crYeqgNaktuW2oPap/ucOt41GnR2d+l2dV6Xeb6+W7+7sobzDeO9hB7cnq2b6bcXO2N6l3sC+yb6ffqf3HL9dbjAbuBkUHLwaHbJrdv3dG/c3NIe6j7rsbdzntq99rvq9xvG1Yebn2g/KB1RGWk7aHqw45R9dGuR1qPesZ0x/rGjcZvPzZ/fP+JzZNHE04Tk089nk5P+k3OPwt7tvw84fnGi8wpzNShl/QvS15xvap+Lf66ZVpl+sYbozfDbx3evpjxnfn4Lvbdz9mc9+T3JXO8cw3zCvPdCyYLox92f5j9GPVxYzH3E8Onk5/FPl/7S++v4SXXpdnlmOXtlcNf2L+c/6r0tX/VdvXVt/BvG2uHvrN/r19XW7/zw+XH3EbiT9zPsk3xza4ty62p7fDt7ShqDPVXKIBCKhwQAMDKeSTed0Nyh1EAiLS/c4o/BYUEH/AvXjISbWkhMVoRGIEokCtUD8NwODyD8ketoPMxcphpbBUuBG9EECHSkmAaFJmBVpLOnD6G4SzlJRMPsw/LFTY0uzdHLxcvdx7PMp8n/31BDaFzIkyimWJzEjaSLdK0Mr6yV+U2FDQVY5VOKw+ovFFdV6fR4NCU0FLTNtKx0XXXC9JPMMg1LDGqN+4yuWf63GzefM0SbUVvzWUjukveVsPOwN7cwcbR3snJ2cXF1dXNzd3dfbe7h7un+x5XL2dve6q1j4mvjp+yv0QAbyBjEC5oI/hzyJvQx2F3kFN5IbIq6kh0cgw1Vj+OPe5zfF9CaWJkkkWyYPJmytPUlr0H07zTVTNokbN1PaswO2ifdg5jzvz+ntyiA0EHtfJY8jbz0Yd1jjQfVTt25fhmEW+x5AmZErlS+TLFcqUK5UrlkypVGqdMTvufKTs7WcNcq3/Osy7ifEp9bsPxxsoL55pamjsv3moZu/TpCv/VqGujbeLtYR1lnW1dD6/PdW/1sNyU73XuK+yfHzAbrLz94M6boaV72PvCw6YP/EZiH4aNOj1SHeMZJ46vP5558mDi5tOuye5nN5/3veiZanl5/FXYa4Np9umVN6NvO2fq31XOHnu/fy55PnzB+4P1R8VFyuLHT7c/1/6VuxSybLOi9EXgq/iq57ee73LrxT9e/2TfdN2q3d7esRNAApxIlGgPUkATeA+JQpFQL8wJZ8MrqCjUd/RBDD9mEBuHk8F9wfcTqohpJD8aV7IDrSudD308Qz6lnnGU6TuLKKsnWxH7Q04ylxX3YZ4RPjK/ncBxwVFhkoixaIJYnfgjia9S9NJiMkqy6nLq8ooK4oo8SvTKkPJXlVnkthpS79Ro0KzQytdO1QnR3a1no29goGooYyRkzGFCb4o13TBbMp+1mLQctuqxvmRTvavINscu1p7qYOuo4yTpzOaCcVl2nXIbcr+6+7RHnmfsHk8vY28pKiP1u89L3z6/Wv+DAaGB1kGywQzBX0KehLaFlYUnR7hGqkRRohaib8YUxfrFKcdj4icSziXGJxknMyXPpFxJzdxrk8aV9iG9K+NIZkiWfbYRYhka+1Vy5Q5IHhTO4z3Enk85TDqCPrJZ8O3o8rGV4+tFuGK2E2IlqqVGZbbluysCK2NOplUdOFV4+uSZ82c7qsdq1s+J13mcz69vbXjeuNXE32x8MajlyKX2y5+vKl/b3/qondyh3RncVX79fvd2j/LNsN7avqlbDAN6g8G38+80Dg3dXbhPHlZ84D6S/bBp9OkYdlzpsdeTnInapwOT758TX8hOOb5MfnXq9Z3ptbfyMzHvrs6uzEnNBy7UfHi9yPnJ9fPJv5aWE75Ir1LWiOvwj48/r28F/9E/EbACKWCG5Kal4B6EhUyh49AMrA2fRZFR+9E4dCFGBNOL9cNRcHfxBwk2RF7iOukxTQf5HG05XSH9UYZCSgXjOaY25iGWV6zr7BQOaU4TLir3Xp5S3ot8/fyPBWYFPwmtCC8hUdOkWL/4OYl9ku5SstKQ9JhMrWyinIU8n/yawohinVK6spOKlCqsOqnWrJ6t4awpobmpNapdo5Ooa6HHq7eqP2xwzjDdyNlYxgRjMmV6zeyQubeFiiXJctqq1TrPxhPxFBjbZ3ZN9pkODo7Cjt+chpwrXEJdNd1Ibi/cL+xO8TDzZPF8t+eyV4a3JZWVOuNz0TfFz8Sfwf9FQF1gdJBmMDp4JKQ01DtMPGw5vCMiM9IkihA1HH04xiIWHzsYlx2vE7+R0J4YmySTtJBcm+KVypH6eG9Bmlk6nN6TkZ5plsWdtZE9vW8o5/L+ytycA+EHnfN0Donkk/NXD08duVXQeLT4WNbxxMKYoqhiJCwoiS6NLosqj6gIrvQ+6VBlccrqtOeZ5LNV1YM1n88x16met6q3b7Br3H0htela80aL6aWiy6+vSl5LaO1rJ3U4dJZ1vejmvxHWc6OXsS+k/9YA52Dc7ZEhkbtp9x4PSzzIHpkZdX40Me77eHXi4CTHs+YXelMTrzKnrd86vDv2fm2heHFw2XHt2Y7+f39b2ilYFQDOmQDgXAyAgzqCCwAQrkfuDy0AbMkAOKoDmL0cQDeiAOQh9s/9wQP0kbtjH6gFg4j3wCL+wxwKhY5ALUiu9xVmhTVhL3gfXA+PwF9QHCh9VBDqGKoD9RZNQqugqegj6E70HIYZY4yJR7KuSSwNVh+biL2InccJ4Lxwp3Cv8AL4IPwl/CbBinCG8I1oS2wmkUkRpDEaNZqzZBI5gTxDa0fbR6dAV0vPTn+MgcCwnwJTshkxjHlM9EzlzMLMV1mMWCZZI9nwbLXshuzvOA5wSnM+4crgluKe4ingNeLd5OviTxHQEcQIPhQ6KRwqoi1KEf0gNiBeLZEt6S9lJa0uIyMrK6cj76QQprgPcfmtKuOq39S5NUw1E7QatF/rsuu56JcbvDYSM443uW3GYR5occKy1CrBWs9626Zv12HbELtg+xyHS47vnDlcHFwL3IZ3kz3sPEv2THrTURV9TH2d/Pz8MwIuBM4Hy4dkhY6HiyGW9zxaNaYk9nu8S0JT4qdk1hS5VIO9bmkZ6Z2ZhKyg7Ac5KvurD9AdTM+by9c/nHOktWD6GO1xm8JLxUonBkttyh5UmFXerrI79f3MUHVP7ZW60vqUxuCm3Rf1LzFffnO1uTWjfU+n+/W9N9pvrverD4TfPjRUfq92uGWkZ/TR2NwT/FPtZ0defH3lPt06Q5qlznV9wC+KfgZ/VS3zrJR95VptWwtfV/7x82fbltcv/yEELEE0KAHd4C2Eh2QgRygFqkYy/WWYHTaAQ+ETcC/8EcnZDZHbpAo1jNpAS6I90AXoPvQqRgJDxZRhHmFJWFPsfuwADouzwB3FTeKF8LH4QQIXIZEwQVQnniERSYmkORpXmgdkQ3I3rRptG50KXSe9Lv1tJEd9RvGnrDBmMzEx1TPrMj9jiWdlYm1jc2eH2Zs43DgJnN1csYiu53nO8wbzyfB94+8TOCroJaQoTBR+J9IvWiuWJx4r4S1pJ2UsrSWjKqsspyKvoWCgaK20WzlCJVe1Tu2h+pamklak9kWdFT11/RyDcSNR4wyTF2aa5lUWm1a21kU293b9tJOx93M45fgc0bGH61m3D7uVPfZ5jnsJe8dSu322/LT90wL6ggjBziHnQtfCrSJqIn9Gu8V0xLHH7014niSXnJpyI/VHmkZ6VsZIlkB28r7x/XK5BQc+59kcaszfOKJXsPdo67HVQqOi6hOEkpjSyXKdipqT+KrIUxNntM/W1TDV5tVhzxc08DRea7JunmlJuky6cvqaUuu9du+O1a6D3Vw3Wm+69MH9rQPBt7nujNzNvK80/GGkZnT3GMP4zSe+T8Fk5XP1Fy9fHnitMP367eF3mrOLc6cWbD6sLh78tP6X+dL+5csrI1/mv25/Y1tT/O64vvdH48aHTbWtE7/0Lw4cQQZoAONgCxJHtJ8JNUGTMBZWgn3g43AfEkUIopxReagbqC9ocbQ3uhw9jqHDWGHyMfexZKw9thz7FieNS8M9xIvgs/BvCKaEK0QhYiWJhXSChoWmgsxLrqOVo+2ms6J7jcQbdAxNFGvKMmM5kxHTCnMNizMribWPLYVdhf0bRydnBpc5Nyui6xu8J/hikAhESZBDCI3cPTMiz0THxB4imfkTyVdSH6V/ylLkpOQtkBNdpNSj/EmVT81FvVBjTItZ21OnUXdD39ag0YhgHG7y1MzC/LalldWkTbAtsKt00HJ861zgquu2uvuyZ4yXiveKT6WfpH9zoERQXYhIaEO4bERnlGn0ZGx4PDahOkk/+XVqUho2vSCTKat8n0BOc67mgQd5vvnQ4QsFHsewxyuLeIpPlOBKE8vmKtwrx6tcT30901DtX4s7d6juW71rQ+sFpqa45okW9UunrmCuRlx71mba3tkp19XYLXSj8iZtb1rfh1suAwO3Fe6cvUu5l3N/7UHYyLtRz0fPxl0eP51wfHr3mcLzwhcfX+q8Knj98o302/SZ0VnB90lzDxYEPyR87F3c+iz/l8WS27Lbis0Xra+Cq7jVt9+61jK/a39fWs/6QflxZoOwEb3x7KfBz/Kf85uqm/s3H28JbgVvNW8tbSttJ21f39F/bIDi7w+wEI0BAJhX29tfRADAFQKweXx7e6N6e3uzBkkypgDoDfv9v+LXXUMPwMkbO2iwWPq/fSEF4D8AuMhy80rfQREAAAAJcEhZcwAACxMAAAsTAQCanBgAAADySURBVDhPpZGxagJBEIb/OX3FVHYW6QJ5ACFoxCZdqlTmHfIASiq7KEKwEGxsLFKkCBgIOvnnnDt33bUQFz5u55t/uGVXVBXXrsK/gMiCdL3KL5Ebsk5ydpISYEnsXD/kqfbH/jPZk9lpLypYTkplFMV74F/df0d5JxFULz5gbMjI97sk62Ql9S358+GK+2yWZKWxB8ZES0S2uUxFVlIP/e+GXbTd0Vc2S1IJPPqwcXgl4MPrVZI3Gwmg42F7yoeT3htPY71p5M3UBXBHbHhLWmGoptnsa6Pxy/489McA0CaTsHkWkR6zn1WdBi4BGKgq/gG/7urUH9AFgAAAAABJRU5ErkJggg==';

    const green_tick = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAElSURBVDhPnZK/SwJxHIbvDiKoraVBXMOIlmprtMmxoUG0oUCkqeagH3BbFLREYyI4qH9Ai3+Bg0o0NAiOtbdEaD3v985DDu9HvfDw3n3w8eP5Pdv6R8qd6gqVdbzb9EHcoQ5g8KfNiIfUFpzV848/qWQk1SVI3Ecca5Ao++It7MEu4qcGSppnduEYtDEQlViZrUfUOZwgDs1wJpEy4jb1AG1oaBbO3GdGXKJ6sAo5tr5rHo7ZzIczMPsrrmENrqJExUZapLvwAiVYhz6MYAP5m54bbdP5bUIRKnADC3ARJyqSP+DL3HnnWYBXaGoQF4dvv6fNm0CW/XaZT/zryEz/pCd49i4tnWfLu4yPkdmiOgU94x335t1NSnA8CG+UjqhmBomxrF9GxE69M6wFwQAAAABJRU5ErkJggg==';

    const ncl_logo = 'data:image/png;base64,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';
    const logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAoCAYAAAAbrx+3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAArFSURBVHhe7ZptbJZXGcfPQ18osL4Dhb6xgbwUhrzFOXVxcbqBi3zAROMUp4maOPWDRhM1xkTjmB9dDKBftpiY7As6jJmyLSGSqaQoK91gUN5KW0rfaAuUtrT0zd//vs9pDzf306cPywqY55/8Oee+73POfe7rf13XOecpJoMMMsgggwwyyGA2kLDlfYeJ4QM5FItgmeVCOA/mWc6FE3DI4yDsgp227EnM/ewY5X2De14whCmheASug6vgSluWw/c7/1HYAs9anoHH4VGE7Ke853DPCYZA1RRb4WPwUSiBZnueEvIkPALfgm8ioCLyruOuC4ZAcygkzA64DSqS7jVHGod18AB8FdYjIMXs464ZBqFqKL4Cn4HLde8+wnvwFRHhmoI7s4RZFcxG09Pw+/AJeK9FUrrQhuVv8EV4CPG0yflAMSsGQ6hsip3wJ3C17v0foh7ugq8inFLoB4IZCzbx2nP7aK2tM73kSHRV76Ae7Kx6uPgX5aHEtt8FW2WEUovPwRfgw7oXiw6yys1hKow1B20ryJAJBeMMMcRuveuivWCMMvYtc+fb6wiuMc1r3VRoV1BqTJFOBjG43GrMjQHmwSeUrzAmK8s+8HCTk0JHc1jPLzameLFq/zFNJ18yrWeXUnf27Up8+vd7bf0WTBz8NpMw34Nq+2fayZZJ4QZMiYn938GiE7mhSOG9W8qp+nVssds8vvUPJnfubu48GT5IAhn76EGGtk6pcTZ8MjTATHGSzVxvh70ApdiqRieBGLRfMOb8u2G9mOPbOu13IhjhU4+8bi/A6i2c+CrthYe288Y0ngjri6s4bGwO6xe4d4lnU5ADP4YYteHlFBDsKYo3wivzM9rIuZNi5m58U8Sa4nCkDOq2zXAi34yYn5raw6fN8PD0YgkXMeAw3j5CPSBjtbtomQHk5VcjO25F0KgGi0GhHNqi/wr7v5hzcxCBHqLXDv59OUlyKDx/HlbfH2YumC/OzcQrnFQ+Zfkshv4lhv5v+Iy2Kq9w7vz3YfpJyWlwicjwnUH1S2345Ax/gOi8RB+iU80VpOJNxOpp19PbkfeAMbn6IQSM8LKBvrDuIyrQ1RjBJHQfggtzMGPqjLCVaIoJ5/SQZoTBMJJaEs/sPRTwS3v/CH9hdmx/znzi423BxCWu2vUg2rsNVJKgpxdjkBIlVPESY+bTV/V+DN7Ls5mgHWGc2JVrwlJR2pokSmXcIlKhE1drWhTRe8M3wtTtY5BvU+oU5uVPOUEUeZNrqaLs5bB650hDMIzgR5kHNhcsOuYfZnFpuXkcJyqyhhfPYLgrMV4sNPIsaEd9MYKJzjHONKrF9Lh6leUcL1f7vCJjqtisjOeE190860/y61IBeye9V8J2R6JHm5++66RUnuVgbIk6xj99EQfyo9BPs1GULfPFrJk49N0v2/odIT3BnDG9LIdYn6F4DeJmIIdd3uZ1GIOhXZ9mb0PgMEpKOa/ooD6GkSvLMXgF/XBE9WvDQEpt00HpNIh42i9C7BzGKUQMOdYQRm4lXcahSIJRqq+E9dNvL0K4eVfbiBV7IsL2EoX6AUuUA/jQxtlREf2hjbobIitnNzb7iL1KG2kIJtrJi4AXb6LYD0OxHBbh7Qu45Yx5Xj+OR9CGAQYwlIxbiodK6AV4dAl1vWuQZ01J1iFBRj7dEo4/hsgViC1Usltzc7wY4yhCHh7v0u8ATqGIcuhCiGBM5lPMlj+LOWk+uu+gd3crsmk3yrsL9Pu0hzHuK3pF+YK2+/NpI3FvDBWbzosHsJ1+I50SdoaYuWBBOqQMjBGIpT9p6Hc1VvEYFBXYtnbiUdTr7GXHXPtQeE9YjsFd6j01zW6xE4P1YWz1L8QY+QvC+0swTtbc0Fm6EKIzZo0Sim1aFDu96OkgstVX65KEzWdstbnGOjZg1zGl2n5erHku4Hmu/pLjQSIFtrJ1neWqV029r+FkqRkZ2Y8NCyeFDUjbFEg/wvQxo8EpUr+lPQjjUeILZu85DDJIC6lIY2XzsWXeDqsCQ07g3erXei3cbcahgYOtm1MF6dAhi0+qJNrcu5uSRNlCIlnvF9vt+jTERTfvUz8JKpRYYYcIg27bTk7gHFjpNQqtf87pxqFQiiNJXPUZ0Pc360ful7hOBPc0D7VPgTQE8ybxcKUWTv0WmBxteLebSDTCjhE5g6wxGquctJMt/S3m5WJwPi4QA56LSadDeMBZzl7qn6D9ysihtorgd+8+TVrVpiGKUtL2uHWMdpxHa2q7TYeiBBUWWWGDdlawoJ29p3QeRTTCBEVZDRqpj+x4mk3VyOjnzcp1X5y0q5gC6QnmmJ1jF4xpcJkU4iaSpT8OeziJCO6D6jlz7TpgzAvw15bHtZmwfY+yTkUN3oLB+rGEnist7nnTmN/83ZgXLfcdCZ+J13hJU8yfsvIQ+gHSnhujFwdr1UaHZ+M4kAQVlGoX2GzRynsDYRE4aIfgJbadD61Vaq9vcIIJJWSSMjZXenadAc41JRj768G1a58CaaZES38ScegeYKNhP0qsIhU4XGKL30ra8b3Kn3BQ0k79dN09hIEix4JarX+UzvNvo3+f+vEku8VqUqkbQ5HcbCMsH4EkqIOLsl7m0oL4cgK1K0QsPzs4yD7u/dqA+Fi3mvuU4okLlKNzJq/FFJi5YJPGjJlEFH85TdqidO3XaH9iUUdEuWfFeHglYt5GDFTAXib4CNrVeQbvo3MzAur+BMYqp+1SGJT0ddfaqbr+jUSO0mgUFbTXc/E9UmcnjqY+ZfT3sYRrtdE6duT8VJ9oO4dgDaNUm6hzF/Jdbo1VlNWesuPxTEyBNCPMDqyQj8MVjLmnjjTnzjJwM5Mr93b9xy7bj4FfWG/Mtx4J+U3Lb1ju4Jkbox7vH7ZfXo9hb5AiNUYN6eVZ2opfFT9qzE7KnZRf+1gonhzmOn2PxUTZQuaVRSRpLKVwvUvtJaQPOZGbizKE5q4+D3qO6GMywmw9ikfX8o8O+LTp1Xu5dAGRAmluOmzZhTANbKsd/8oCuucdY378TwxKWnGClJD/t+v/y1i8QzrpsIYpKyQSPCGjWEaEFNFfY10hOhp5j1BLhLqP25hiKV1lNx/iiZjNSy5r0ELmobGCdpSGe0u450MboULm6r5f75/DvUWkzjj4grldoo957IzXLJsaz2cK3FlKfItNwa+Ohnwe7iNN1CKGUp2bxEJC/4cc6Au8teBtRZfGob5lKd5NfTqs1W5R7eHBZlIh2/yLSltcz+eMVBUxbBTreYfSpt7ZSGR0xhwRVnnv0LyUpud7c3bw06eo6E0GpUSNpffGRZiwibNnwv6M5hxcZQrc2abDn7joxBSz8NCnmczzpCRfrCFmftjtDmm3EUOlwocVIXbcU2xi3kA0N4cNiJGdYvr5vL9caxn9B1l/jsacyR6SEJRqo++ojqRDh2Vaxygd/Y1UFJMRBpMJJqdYX32r7cQUSN3CYuKpH3l/cQ7+nSrzEWkDH1CDcbZxJoqLnAEWvpcb+ADWnxWkku3Jz9y34E/niIzBW2eq+o4VpC7768Z0qMNJ6qxQm3CALd4hWxhhPvtY+IeZn8Z9cjnRFJOqR2m3n3ZDtMum4Q7WoTy+Ow5nyCRv2zXzMb6zCrvE4Toh9Tpj6r3jE2OmoeMHiV2/nfYvzhlkkEEGGWSQQQYZZJBBBhlkkEFSGPM/enFPZJX8kEEAAAAASUVORK5CYII=';
    const doc = new jsPDF();

    // header page
    doc.addImage(ncl_logo, 'PNG', 20, 20, 30, 12);
    doc.addImage(logo, 'PNG', 150, 20, 30, 12);
    doc.setFontSize(22);
    doc.text(20, 50, 'Assessment Report');
    doc.setFontSize(14);
    doc.text(20, 60, 'DAAWN v.1.0');
    doc.text(20, 75, 'Date : ' + date + '/' + month + '/' + shortyear );
    doc.text(20, 90, 'Name :');
    doc.text(20, 105, 'DOB :');
    doc.text(20, 120, 'Clinician Name :');
    doc.text(20, 135, 'Participant ID : ' + id);
    doc.text(20, 150, 'Data collected:');

    doc.setFontSize(12);
    doc.text(20, 160, '- Correct or incorrect response');
    doc.text(20, 165, '- End response');
    doc.text(20, 170, '- Automatically scored results using the CAT system');
    doc.text(20, 175, '- Automatically scored results using the Damerau-Levenshtein algorithm');
    doc.text(20, 180, '- Reaction time (time taken to type first letter from seeing the image)');
    doc.text(20, 185, '- Response time (time taken to write the entire response)');
    doc.text(20, 190, '- Process response (all letters, pauses over 1 second and deletions');
    doc.text(20, 195, '- Number of letters');
    doc.text(20, 200, '- Number of keystroke');
    doc.text(20, 205, '- Number of deletions');

    // notes page
    doc.addPage();

    doc.setFontSize(14);
    doc.text(20, 20, 'Notes :');
    doc.setFontSize(12);
    doc.text(20, 30, 'Please record here any information that may be relevant. For example:');
    doc.text(20, 40, '- Device used for text entry');
    doc.text(20, 45, '- Handedness/whether using single hand typing');
    doc.text(20, 50, '- Previous experience of computer/keyboard use');
    doc.text(20, 55, '- Education/any previous difficulties with writing/spelling');

    // CAT summary data page
    doc.addPage();

    doc.setFontSize(14);
    doc.text(15, 20, 'Summary');

    // must correspond to set taken, so should not show 5+ letters if set 4 is taken.
    doc.autoTable({
       head: [['Breakdown', 'Items Attempted', 'No. Correct (no hint)', 'Percentage Correct', 'Correct (with hint)'  ]],
       body: tableSummaryData,
       startY: 30
    });

    doc.setFontSize(14);
    doc.text(15, 120, 'CAT Scores Summary');

    // must correspond to set taken, so should not show 5+ letters if set 4 is taken.
    doc.autoTable({
       head: [['Breakdown', 'Total possible CAT score', 'Score (no hint)', 'Percentage', 'Score (with hint)', 'Percentage'  ]],
       body: tableCatSummaryData,
       startY: 130
    });


    // timings page
    doc.addPage();

    doc.text(15, 20, 'Scores and Timings');

    doc.setFontSize(12);
    doc.text(15, 30, 'The reaction time is recorded at either the first keystroke after the picture appears or when the ');
    doc.text(15, 40, 'person clicks the ‘Hint’ button. Response time is from the first action to when the attempt is ');
    doc.text(15, 50, 'completed. Reaction times over five seconds are shown in red.');


    doc.autoTable({
        head: [['Item', 'Correct/Incorrect', 'End Response', 'CAT', 'LD', 'Reaction Time', 'Response Time']],
        body: tableReactionData,
        didParseCell: function(data){
            // use index value of header column for dataKey
            if (data.column.dataKey === 5) {
               var td = data.cell.raw;
               td = parseFloat(td);
               if(td >= 5.00){
                   data.cell.styles.textColor = [255,0,0];
               }
            }
            else if(data.column.dataKey === 1 && data.cell.section === 'body'){
                var td = data.cell.raw;
                td = parseInt(td);
                 if(td === 1){
                     data.cell.text = '.';
                 }
                 else {
                  data.cell.text = '';
                 }
            }
        },
        didDrawCell: function(data) {
            if (data.column.index === 1 && data.cell.section === 'body') {
               var td = data.cell.raw;
               var dim = data.cell.height - data.cell.padding('vertical');
               var textPos = data.cell.textPos;
               if(data.cell.text.indexOf('.') > -1){
                   doc.addImage(green_tick, textPos.x,  textPos.y, dim, dim);
               }
               else {
                   doc.addImage(cross, textPos.x,  textPos.y, dim, dim);
               }
            }
        },
        startY: 60
    });

    doc.addPage()

    doc.setFontSize(14);
    doc.text(15, 20, 'Mean and median responses');

    doc.setFontSize(12);
    doc.text(15, 30, 'The median response time has been added to take into account any extended pause');
    doc.text(15, 38,  'during the assessment e.g. discussion about an item or a rest break.');

    doc.autoTable({
        head:  [['Mean Reaction Time', 'Median Reaction Time', 'Mean Response Time', 'Median Response Time']],
        body: [[ reactionTimeMean, reactionTimeMedian, responseTimeMean, responseTimeMedian ]],
        startY: 48
    });

    doc.addPage()

    doc.setFontSize(14);
    doc.text(15, 20, 'Process response');

    doc.setFontSize(12);
    doc.text(15, 30, 'A star (*) in the process response indicates where the first letter was supplied by a Hint.');

    const headrow = [['Item', 'Process Response', 'No. Letters', 'Keystrokes', 'No. Deletions']];

    doc.autoTable({
        head: headrow,
        body: tableProcessData,
        startY: 40
    });

    doc.save('report.pdf');
}
