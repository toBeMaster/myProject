function setPrintBase(headerText,footerText,rootUrl) {  
  
    // -- advanced features  ，未曾使用过，有待确认。  
  
        //factory.printing.SetMarginMeasure(2); // measure margins in inches  
  
        //factory.SetPageRange(false, 1, 3);// need pages from 1 to 3  
  
        //factory.printing.printer = "HP DeskJet 870C";  
  
        //factory.printing.copies = 2;  
  
        //factory.printing.collate = true;  
  
        //factory.printing.paperSize = "A4";  
  
        //factory.printing.paperSource = "Manual feed"  
  
    var header = (headerText==null||headerText=="")?'默认页眉':headerText;  
  
    var footer = (footerText==null||footerText=="")?'默认页角':footerText;  
  
  factory.printing.header = "&b"+header+"&b" ;  
  
  factory.printing.footer = "&b"+footer;  
  
  factory.printing.portrait = true;  
  
  factory.printing.leftMargin =10.00;  
  
  factory.printing.topMargin =10.00;  
  
  factory.printing.rightMargin =10.00;  
  
  factory.printing.bottomMargin =10.00;  
  
}  